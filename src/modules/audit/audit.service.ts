import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async getLogs(limit = 100) {
    return this.prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
  }

  async createLog(data: any) {
    return this.prisma.auditLog.create({ data });
  }
}
