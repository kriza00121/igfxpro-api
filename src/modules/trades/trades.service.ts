import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TradesService {
  constructor(private prisma: PrismaService) {}

  async getAllTrades() {
    return this.prisma.trade.findMany({
      include: { account: true, market: true },
    });
  }

  async getTradeById(id: string) {
    return this.prisma.trade.findUnique({
      where: { id },
      include: { account: true, market: true },
    });
  }
}
