import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, RoleName } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string, role: RoleName = RoleName.CLIENT): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, password: hashed, role, status: 'ACTIVE' },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
