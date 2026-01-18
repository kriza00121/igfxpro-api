import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CalculatorsService } from './calculators.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('calculators')
@UseGuards(JwtAuthGuard)
export class CalculatorsController {
  constructor(private readonly calculatorsService: CalculatorsService) {}

  @Post('margin')
  async calculateMargin(@Body() body: { volume: number; leverage: number; price: number }) {
    return { margin: this.calculatorsService.calculateMargin(body.volume, body.leverage, body.price) };
  }

  @Post('pnl')
  async calculatePnl(@Body() body: { openPrice: number; closePrice: number; volume: number; type: 'LONG' | 'SHORT' }) {
    return { pnl: this.calculatorsService.calculatePnl(body.openPrice, body.closePrice, body.volume, body.type) };
  }
}
