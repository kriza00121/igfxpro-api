import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnApplicationShutdown {
  async onModuleInit() {
    await this.$connect();
    console.log('🟢 Prisma connected');
  }

  async onApplicationShutdown(signal?: string) {
    await this.$disconnect();
    console.log('🔴 Prisma disconnected');
  }

  async transaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    return this.$transaction(fn);
  }
}
