import { Controller, Post, Body } from '@nestjs/common';
import { RiskService } from './risk.service';
import { RiskEventType } from '@prisma/client';

@Controller('risk')
export class RiskController {
  constructor(private riskService: RiskService) {}

  @Post('create')
  async createRisk(@Body() body: { accountId: string; type: RiskEventType; level: number }) {
    return this.riskService.createRiskEvent(body.accountId, body.type, body.level);
  }

  @Post('check')
  async checkRisk(@Body() body: { accountId: string }) {
    return this.riskService.checkAccountRisk(body.accountId);
  }
}
