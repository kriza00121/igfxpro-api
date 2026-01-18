import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { MarketsService } from './markets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('markets')
@UseGuards(JwtAuthGuard)
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  @Post('submit')
  async submit(@Body() body: any) {
    return this.marketsService.submitMifid(body.userId, body);
  }

  @Get('eligibility/:userId')
  async eligibility(@Param('userId') userId: string) {
    return this.marketsService.checkEligibility(userId);
  }
}
