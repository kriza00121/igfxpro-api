import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ledger')
@UseGuards(JwtAuthGuard)
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get(':walletId')
  async getLedger(@Param('walletId') walletId: string) {
    return this.ledgerService.getWalletLedger(walletId);
  }

  @Post('entry')
  async createEntry(@Body() body: { walletId: string; type: string; amount: number; reference?: string }) {
    return this.ledgerService.createEntry(body.walletId, body.type as any, body.amount, body.reference);
  }
}
