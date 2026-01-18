import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { MarketsModule } from '../markets/markets.module';

@Module({
  imports: [MarketsModule],
  providers: [PricesService],
  controllers: [PricesController],
  exports: [PricesService],
})
export class PricesModule {}
