import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Wallet } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Recupera il wallet di un account
   */
  async getWalletByAccount(accountId: string): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { accountId },
    });

    if (!wallet) throw new NotFoundException('Wallet non trovato');
    return wallet;
  }

  /**
   * Recupera saldo totale, disponibile e margine usato
   */
  async getWalletBalance(accountId: string) {
    const wallet = await this.getWalletByAccount(accountId);

    return {
      balance: Number(wallet.balance),
      available: Number(wallet.available),
      marginUsed: Number(wallet.marginUsed),
    };
  }

  /**
   * Controlla se ci sono fondi disponibili sufficienti per un importo
   */
  async checkAvailable(accountId: string, requiredAmount: number): Promise<boolean> {
    const wallet = await this.getWalletByAccount(accountId);
    return new Decimal(wallet.available).greaterThanOrEqualTo(requiredAmount);
  }

  /**
   * Aggiorna saldo wallet dopo deposito, prelievo o trade
   * Questo metodo NON deve essere chiamato manualmente, ma solo dai servizi reali
   */
  async updateWalletBalance(accountId: string, amountChange: number, marginChange = 0) {
    const wallet = await this.getWalletByAccount(accountId);

    return this.prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: { increment: amountChange },
        available: { increment: amountChange - marginChange },
        marginUsed: { increment: marginChange },
      },
    });
  }

  /**
   * Recupera tutte le ledger entries di un wallet
   */
  async getLedger(accountId: string) {
    const wallet = await this.getWalletByAccount(accountId);
    return this.prisma.ledgerEntry.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Recupera tutti i depositi e prelievi di un wallet
   */
  async getTransactions(accountId: string) {
    const wallet = await this.getWalletByAccount(accountId);

    const [deposits, withdrawals] = await Promise.all([
      this.prisma.deposit.findMany({
        where: { walletId: wallet.id },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.withdrawal.findMany({
        where: { walletId: wallet.id },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { deposits, withdrawals };
  }
}
