import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../modules/auth/guards/roles.guard';
import { Roles } from '../modules/auth/decorators/roles.decorator';
import { AccountType, AccountStatus, RoleName } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Controller('accounts')
export class AccountController {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAccount(
    @Req() req: any,
    @Body()
    body: {
      currency: string;
      leverage: number;
      type: AccountType; // REAL | DEMO
    },
  ) {
    const userId = req.user.id;

    const account = await this.prisma.account.create({
      data: {
        userId,
        type: body.type,
        currency: body.currency ?? 'USD',
        leverage: body.leverage,
        status: AccountStatus.INACTIVE,
        wallet: {
          create: {
            balance: new Decimal(0),
            available: new Decimal(0),
            marginUsed: new Decimal(0),
            equity: new Decimal(0),
            freeMargin: new Decimal(0),
          },
        },
      },
      include: { wallet: true },
    });

    return {
      success: true,
      message: `Account ${body.type} created`,
      account,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyAccounts(@Req() req: any) {
    return this.prisma.account.findMany({
      where: { userId: req.user.id },
      include: { wallet: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  @Get('admin/all')
  async getAllAccounts() {
    return this.prisma.account.findMany({
      include: { user: true, wallet: true },
    });
  }
}
