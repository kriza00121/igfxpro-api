import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardData() {
    return {
      totalUsers: 0,
      activeAccounts: 0,
      totalVolume: 0,
      totalCommissions: 0,
    };
  }
}
