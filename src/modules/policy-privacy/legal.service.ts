import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LegalService {
  constructor(private readonly prisma: PrismaService) {}

  async getContent(type: string) {
    return { type, content: '' };
  }

  async updateContent(type: string, content: string) {
    return { type, content };
  }
}
