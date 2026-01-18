import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PublicService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyStats() {
    return this.prisma.companyStats.findMany({ orderBy: { year: 'desc' } });
  }

  async getMarkets() {
    return this.prisma.market.findMany();
  }
}
