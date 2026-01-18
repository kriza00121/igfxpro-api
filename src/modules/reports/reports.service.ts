import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async companyReport(year: number) {
    return this.prisma.companyStats.findFirst({ where: { year } });
  }
}
