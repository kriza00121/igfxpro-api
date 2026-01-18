import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TermsConditionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getContent(type: 'disclaimer' | 'policy' | 'terms') {
    return this.prisma.legalContent.findFirst({ where: { type } });
  }
}
