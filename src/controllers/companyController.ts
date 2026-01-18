import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * NUMERI ISTITUZIONALI (HOMEPAGE)
   */
  @Get('stats')
  async getCompanyStats() {
    const latest = await this.prisma.companyStats.findFirst({
      orderBy: { year: 'desc' },
    });

    return {
      activeClients: latest?.activeClients ?? 0,
      totalAccounts: latest?.totalAccounts ?? 0,
      totalVolume: latest?.totalVolume ?? 0,
      totalTrades: latest?.totalTrades ?? 0,
    };
  }

  /**
   * STORICO ANNUALE (TRASPARENZA)
   */
  @Get('history')
  async getCompanyHistory() {
    return this.prisma.companyStats.findMany({
      orderBy: { year: 'asc' },
    });
  }
}
