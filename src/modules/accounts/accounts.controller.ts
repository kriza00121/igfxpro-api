import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AccountType, RoleName } from '@prisma/client';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAccount(
    @Req() req: any,
    @Body() body: { type: AccountType; currency: string; leverage: number },
  ) {
    const account = await this.accountsService.createAccount(
      req.user.id,
      body.type,
      body.currency,
      body.leverage,
    );
    return { success: true, account };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyAccounts(@Req() req: any) {
    return this.accountsService.getAccountsByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  @Get('admin/all')
  async getAllAccounts() {
    return this.accountsService.getAllAccounts();
  }
}
