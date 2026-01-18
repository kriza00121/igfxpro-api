import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MarketsService {
  constructor(private readonly prisma: PrismaService) {}

  getTickers() {
    return [{ symbol: 'BTC/USD', price: 50000 }, { symbol: 'ETH/USD', price: 3500 }];
  }

  getChart(symbol: string) {
    return { symbol, data: [] };
  }

  async submitMifid(userId: string, data: any) {
    return { success: true, message: 'MIFID submitted', userId, data };
  }

  async checkEligibility(userId: string) {
    return { eligible: true, userId };
  }
}
