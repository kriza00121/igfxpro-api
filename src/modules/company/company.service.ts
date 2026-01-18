import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(year?: number) {
    if (year) {
      return this.prisma.companyStats.findMany({ where: { year } });
    }
    return this.prisma.companyStats.findMany();
  }

  async addStats(data: any) {
    return this.prisma.companyStats.create({ data });
  }
}
