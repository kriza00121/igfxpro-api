import { Module } from '@nestjs/common';
import { RiskService } from './risk.service';
import { RiskController } from './risk.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [PrismaModule, AccountsModule],
  providers: [RiskService],
  controllers: [RiskController],
  exports: [RiskService],
})
export class RiskModule {}
