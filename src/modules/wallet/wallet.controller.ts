import { Controller, Get, Param, Query, BadRequestException } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * GET /wallet/:accountId
   * Recupera le informazioni del wallet per un account specifico
   */
  @Get(':accountId')
  async getWallet(@Param('accountId') accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      include: { wallet: true },
    });

    if (!account || !account.wallet) {
      throw new BadRequestException('Wallet non trovato per questo account');
    }

    const wallet = account.wallet;

    return {
      balance: new Decimal(wallet.balance).toNumber(),
      available: new Decimal(wallet.available).toNumber(),
      marginUsed: new Decimal(wallet.marginUsed).toNumber(),
    };
  }

  /**
   * GET /wallet/:accountId/check?required=100
   * Controlla se l'account ha un margine disponibile sufficiente
   */
  @Get(':accountId/check')
  async checkAvailable(
    @Param('accountId') accountId: string,
    @Query('required') required: string,
  ) {
    const requiredNumber = Number(required);
    if (isNaN(requiredNumber)) throw new BadRequestException('Parametro required non valido');

    // Usa il WalletService
    await this.walletService.checkAvailable(accountId, requiredNumber);

    return { success: true, message: 'Fondi sufficienti', required: requiredNumber };
  }

  /**
   * GET /wallet/:accountId/ledger
   * Mostra le transazioni ledger del wallet
   */
  @Get(':accountId/ledger')
  async getLedger(@Param('accountId') accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      include: { wallet: { include: { ledger: true } } },
    });

    if (!account || !account.wallet) {
      throw new BadRequestException('Wallet non trovato per questo account');
    }

    const ledger = account.wallet.ledger.map((entry) => ({
      type: entry.type,
      amount: new Decimal(entry.amount).toNumber(),
      reference: entry.reference,
      createdAt: entry.createdAt,
    }));

    return ledger;
  }
}
