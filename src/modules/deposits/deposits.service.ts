import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DepositStatus, LedgerType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class DepositsService {
  constructor(private readonly prisma: PrismaService) {}

  async createDeposit({ userId, amount, method }: { userId: string; amount: number; method: string }) {
    const account = await this.prisma.account.findFirst({
      where: { userId, status: 'ACTIVE' },
      include: { wallet: true },
    });
    if (!account || !account.wallet) throw new BadRequestException('Active wallet not found');

    const deposit = await this.prisma.deposit.create({
      data: { walletId: account.wallet.id, amount, method, status: DepositStatus.PENDING },
    });

    return { success: true, message: 'Deposit request created', deposit };
  }

  async getUserDeposits(userId: string) {
    const deposits = await this.prisma.deposit.findMany({
      where: { wallet: { account: { userId } } },
      orderBy: { createdAt: 'desc' },
    });
    return deposits;
  }

  async getPendingDeposits() {
    return this.prisma.deposit.findMany({
      where: { status: DepositStatus.PENDING },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approveDeposit(id: string, userId: string) {
    const deposit = await this.prisma.deposit.findUnique({ where: { id }, include: { wallet: true } });
    if (!deposit) throw new NotFoundException('Deposit not found');

    await this.prisma.wallet.update({
      where: { id: deposit.walletId },
      data: { balance: deposit.wallet.balance.add(deposit.amount) },
    });

    return this.prisma.deposit.update({
      where: { id },
      data: { status: DepositStatus.APPROVED },
    });
  }

  async rejectDeposit(id: string, userId: string, reason: string = '') {
    const deposit = await this.prisma.deposit.findUnique({ where: { id } });
    if (!deposit) throw new NotFoundException('Deposit not found');

    return this.prisma.deposit.update({
      where: { id },
      data: { status: DepositStatus.REJECTED },
    });
  }

  // approveDeposit e rejectDeposit modificati con Decimal per aggiornare wallet
}
