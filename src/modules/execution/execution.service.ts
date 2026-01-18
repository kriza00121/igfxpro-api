import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LedgerType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ExecutionService {
  constructor(private readonly prisma: PrismaService) {}

  async executeOrder({
    accountId,
    marketId,
    volume,
    type,
    price,
  }: {
    accountId: string;
    marketId: string;
    volume: number;
    type: 'BUY' | 'SELL';
    price?: number;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({ where: { id: accountId }, include: { wallet: true } });
      if (!account || !account.wallet) throw new BadRequestException('Account o wallet non trovato');

      const market = await tx.market.findUnique({ where: { id: marketId } });
      if (!market) throw new BadRequestException('Mercato non trovato');

      const requiredMargin = new Decimal(volume).mul(price ?? 0).div(account.leverage);

      if (new Decimal(account.wallet.available).lessThan(requiredMargin)) {
        throw new BadRequestException('Fondi insufficienti');
      }

      const trade = await tx.trade.create({
        data: {
          accountId,
          marketId,
          symbol: 'EUR/USD',
          volume,
          price: price ?? 0,
          pnl: 0,
          type: type as any,
        },
      });

      await tx.wallet.update({
        where: { id: account.wallet.id },
        data: {
          marginUsed: { increment: requiredMargin.toNumber() },
          available: { decrement: requiredMargin.toNumber() },
        },
      });

      await tx.ledgerEntry.create({
        data: {
          walletId: account.wallet.id,
          type: LedgerType.TRADE_PNL,
          amount: 0,
          reference: trade.id,
        },
      });

      return { success: true, trade };
    });
  }

  async closeTrade(tradeId: string) {
    return this.prisma.$transaction(async (tx) => {
      const trade = await tx.trade.findUnique({
        where: { id: tradeId },
        include: { account: { include: { wallet: true } }, market: true },
      });
      if (!trade) throw new NotFoundException('Trade non trovato');
      const wallet = trade.account.wallet!;
      const marketPrice = trade.price; // placeholder
      const pnl = trade.type === 'BUY'
        ? new Decimal(marketPrice).sub(trade.price).mul(trade.volume)
        : new Decimal(trade.price).sub(marketPrice).mul(trade.volume);

      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { increment: pnl.toNumber() },
          available: { increment: pnl.toNumber() },
          marginUsed: { decrement: trade.volume.toNumber() },
        },
      });

      await tx.trade.update({
        where: { id: trade.id },
        data: { pnl: pnl.toNumber() },
      });

      await tx.ledgerEntry.create({
        data: {
          walletId: wallet.id,
          type: LedgerType.TRADE_PNL,
          amount: pnl.toNumber(),
          reference: trade.id,
        },
      });

      return { success: true, tradeId, pnl: pnl.toNumber() };
    });
  }

  async getAllTrades() {
    return this.prisma.trade.findMany({
      include: { account: true, market: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
