import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AccountType, AccountStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(userId: string, type: AccountType, currency: string, leverage: number) {
    return this.prisma.account.create({
      data: {
        userId,
        type,
        currency,
        leverage,
        status: AccountStatus.INACTIVE,
        wallet: {
          create: {
            balance: new Decimal(0),
            available: new Decimal(0),
            marginUsed: new Decimal(0),
            equity: new Decimal(0),
            freeMargin: new Decimal(0),
          },
        },
      },
      include: { wallet: true },
    });
  }

  async getAccountsByUser(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
      include: { wallet: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllAccounts() {
    return this.prisma.account.findMany({
      include: { user: true, wallet: true },
    });
  }
}
