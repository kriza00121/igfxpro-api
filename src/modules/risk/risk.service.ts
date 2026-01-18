import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RiskEventType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class RiskService {
  constructor(private prisma: PrismaService) {}

  // Crea evento rischio (margin call / stop out)
  async createRiskEvent(accountId: string, type: RiskEventType, level: number) {
    return this.prisma.riskEvent.create({
      data: {
        accountId,
        type,
        severity: level > 50 ? 'HIGH' : 'MEDIUM',
        message: `Risk event of type ${type}`,
      },
    });
  }

  // Controllo rischio account
  async checkAccountRisk(accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      include: { wallet: true, trades: true },
    });

    if (!account) throw new Error('Account non trovato');

    // esempio semplice: se equity < 50% margin, margin call
    if (account.wallet && account.wallet.equity.lt(account.wallet.marginUsed.mul(0.5))) {
      return this.createRiskEvent(accountId, RiskEventType.MARGIN_CALL, 50);
    }
    return null;
  }
}
