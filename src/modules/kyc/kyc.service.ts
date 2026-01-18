import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class KycService {
  constructor(private readonly prisma: PrismaService) {}

  async submitKyc(userId: string, data: any) {
    return this.prisma.userKYC.upsert({
      where: { userId },
      update: { ...data, status: 'PENDING' },
      create: { userId, ...data },
    });
  }

  async reviewKyc(userId: string, status: 'APPROVED' | 'REJECTED', reviewerId: string) {
    const kyc = await this.prisma.userKYC.findUnique({ where: { userId } });
    if (!kyc) throw new NotFoundException('KYC not found');

    return this.prisma.userKYC.update({
      where: { userId },
      data: { status, reviewedAt: new Date() },
    });
  }
}
