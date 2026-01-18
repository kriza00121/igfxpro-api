import { Module } from '@nestjs/common';
import { TradingService } from './trading.service';
import { TradingController } from './trading.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AccountsModule } from '../accounts/accounts.module';
import { MarketsModule } from '../markets/markets.module';

@Module({
  imports: [PrismaModule, AccountsModule, MarketsModule],
  providers: [TradingService],
  controllers: [TradingController],
  exports: [TradingService],
})
export class TradingModule {}
