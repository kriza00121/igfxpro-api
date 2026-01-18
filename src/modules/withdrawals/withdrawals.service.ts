import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { WithdrawalStatus, LedgerType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class WithdrawalsService {
  constructor(private readonly prisma: PrismaService) {}

  async createWithdrawal({ userId, amount }: { userId: string; amount: number }) {
    const account = await this.prisma.account.findFirst({
      where: { userId, status: 'ACTIVE' },
      include: { wallet: true },
    });

    if (!account || !account.wallet) throw new BadRequestException('Active wallet not found');

    if (new Decimal(account.wallet.available).lessThan(amount)) {
      throw new BadRequestException('Insufficient funds');
    }

    const withdrawal = await this.prisma.withdrawal.create({
      data: { walletId: account.wallet.id, amount, status: WithdrawalStatus.PENDING },
    });

    return { success: true, message: 'Withdrawal request created', withdrawal };
  }

  async getUserWithdrawals(userId: string) {
    return this.prisma.withdrawal.findMany({
      where: { wallet: { account: { userId } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPendingWithdrawals() {
    return this.prisma.withdrawal.findMany({
      where: { status: WithdrawalStatus.PENDING },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approveWithdrawal(id: string, userId: string) {
    const withdrawal = await this.prisma.withdrawal.findUnique({ where: { id }, include: { wallet: true } });
    if (!withdrawal) throw new NotFoundException('Withdrawal not found');

    await this.prisma.wallet.update({
      where: { id: withdrawal.walletId },
      data: { available: new Decimal(withdrawal.wallet.available).minus(withdrawal.amount) },
    });

    return this.prisma.withdrawal.update({
      where: { id },
      data: { status: WithdrawalStatus.APPROVED, approvedBy: userId, approvedAt: new Date() },
    });
  }

  async rejectWithdrawal(id: string, userId: string, reason?: string) {
    const withdrawal = await this.prisma.withdrawal.findUnique({ where: { id } });
    if (!withdrawal) throw new NotFoundException('Withdrawal not found');

    return this.prisma.withdrawal.update({
      where: { id },
      data: { status: WithdrawalStatus.REJECTED, approvedBy: userId },
    });
  }
}
