import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleName } from '@prisma/client';

@Controller()
export class DepositsController {
  constructor(private readonly depositsService: DepositsService) {}

  // ===============================
  // CLIENT AREA
  // ===============================

  /**
   * CLIENT → CREA RICHIESTA DEPOSITO
   */
  @UseGuards(JwtAuthGuard)
  @Post('client/deposits')
  async createDeposit(
    @Req() req: any,
    @Body() body: { amount: number; method: string },
  ) {
    return this.depositsService.createDeposit({
      userId: req.user.id,
      amount: body.amount,
      method: body.method,
    });
  }

  /**
   * CLIENT → LISTA DEPOSITI
   */
  @UseGuards(JwtAuthGuard)
  @Get('client/deposits')
  async getMyDeposits(@Req() req: any) {
    return this.depositsService.getUserDeposits(req.user.id);
  }

  // ===============================
  // ADMIN / BACKOFFICE
  // ===============================

  /**
   * ADMIN → DEPOSITI PENDING
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  @Get('admin/deposits/pending')
  async getPendingDeposits() {
    return this.depositsService.getPendingDeposits();
  }

  /**
   * ADMIN → APPROVA DEPOSITO
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  @Post('admin/deposits/:id/approve')
  async approveDeposit(@Param('id') id: string, @Req() req: any) {
    return this.depositsService.approveDeposit(id, req.user.id);
  }

  /**
   * ADMIN → RIFIUTA DEPOSITO
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  @Post('admin/deposits/:id/reject')
  async rejectDeposit(
    @Param('id') id: string,
    @Req() req: any,
    @Body() body: { reason?: string },
  ) {
    return this.depositsService.rejectDeposit(
      id,
      req.user.id,
      body.reason,
    );
  }
}
