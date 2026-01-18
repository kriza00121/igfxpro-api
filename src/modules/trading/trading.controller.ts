import { Controller, Post, Body } from '@nestjs/common';
import { TradingService } from './trading.service';
import { TradeType } from '@prisma/client';

@Controller('trading')
export class TradingController {
  constructor(private tradingService: TradingService) {}

  @Post('open')
  async openTrade(@Body() body: { accountId: string; marketId: string; symbol: string; type: TradeType; volume: number; price: number }) {
    return this.tradingService.openTrade(body.accountId, body.marketId, body.symbol, body.type, body.volume, body.price);
  }

  @Post('close')
  async closeTrade(@Body() body: { tradeId: string; exitPrice: number }) {
    return this.tradingService.closeTrade(body.tradeId, body.exitPrice);
  }
}
