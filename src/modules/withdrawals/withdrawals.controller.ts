import { Controller, Post, Get, Req, Param, Body, UseGuards } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleName } from '@prisma/client';

@Controller()
export class WithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}

  // ===============================
  // CLIENT AREA
  // ===============================
  @UseGuards(JwtAuthGuard)
  @Post('client/withdrawals')
  async createWithdrawal(@Req() req: any, @Body() body: { amount: number }) {
    return this.withdrawalsService.createWithdrawal({
      userId: req.user.id,
      amount: body.amount,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('client/withdrawals')
  async getMyWithdrawals(@Req() req: any) {
    return this.withdrawalsService.getUserWithdrawals(req.user.id);
  }

  // ===============================
  // ADMIN / BACKOFFICE
  // ===============================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  @Get('admin/withdrawals/pending')
  async getPendingWithdrawals() {
    return this.withdrawalsService.getPendingWithdrawals();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  @Post('admin/withdrawals/:id/approve')
  async approveWithdrawal(@Param('id') id: string, @Req() req: any) {
    return this.withdrawalsService.approveWithdrawal(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  @Post('admin/withdrawals/:id/reject')
  async rejectWithdrawal(
    @Param('id') id: string,
    @Req() req: any,
    @Body() body: { reason?: string },
  ) {
    return this.withdrawalsService.rejectWithdrawal(id, req.user.id, body.reason);
  }
}
