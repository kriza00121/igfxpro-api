import { Controller, Get, Param } from '@nestjs/common';
import { TradesService } from './trades.service';

@Controller('trades')
export class TradesController {
  constructor(private tradesService: TradesService) {}

  @Get()
  getAll() {
    return this.tradesService.getAllTrades();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.tradesService.getTradeById(id);
  }
}
