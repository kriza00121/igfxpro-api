import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TradeType, TradeStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class TradingService {
  constructor(private prisma: PrismaService) {}

  // Apri un trade
  async openTrade(accountId: string, marketId: string, symbol: string, type: TradeType, volume: number, price: number) {
    const trade = await this.prisma.trade.create({
      data: {
        accountId,
        marketId,
        symbol,
        type,
        status: TradeStatus.OPEN,
        volume: new Decimal(volume),
        price: new Decimal(price),
        entryPrice: new Decimal(price),
      },
    });

    // Price snapshot iniziale
    await this.prisma.priceSnapshot.create({
      data: {
        symbol,
        price: new Decimal(price),
        timestamp: new Date(),
      },
    });

    return trade;
  }

  // Chiudi un trade
  async closeTrade(tradeId: string, exitPrice: number) {
    const trade = await this.prisma.trade.update({
      where: { id: tradeId },
      data: {
        status: TradeStatus.CLOSED,
        exitPrice: new Decimal(exitPrice),
        closedAt: new Date(),
      },
    });
    return trade;
  }
}
