import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LedgerType } from '@prisma/client';

@Injectable()
export class LedgerService {
  constructor(private readonly prisma: PrismaService) {}

  async getWalletLedger(walletId: string) {
    return this.prisma.ledgerEntry.findMany({
      where: { walletId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createEntry(walletId: string, type: LedgerType, amount: number, reference?: string) {
    return this.prisma.ledgerEntry.create({ data: { walletId, type, amount, reference } });
  }
}
