import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      include: { accounts: true },
    });
  }

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, include: { accounts: true } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
