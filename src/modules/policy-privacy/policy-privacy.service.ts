import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PolicyPrivacyService {
  constructor(private readonly prisma: PrismaService) {}

  async getPolicies() {
    return { policies: [] };
  }

  async updatePolicy(id: string, content: string) {
    return { id, content };
  }
}
