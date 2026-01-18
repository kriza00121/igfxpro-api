import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RiskClass } from '@prisma/client';

@Injectable()
export class MifidService {
  constructor(private readonly prisma: PrismaService) {}

  async submitMifid(userId: string, data: any) {
    return this.prisma.miFIDProfile.upsert({
      where: { userId },
      update: {
        ...data,
        eligible: data.riskClass !== RiskClass.HIGH,
      },
      create: {
        userId,
        ...data,
        eligible: data.riskClass !== RiskClass.HIGH,
      },
    });
  }

  async getMifid(userId: string) {
    return this.prisma.miFIDProfile.findUnique({ where: { userId } });
  }
}
