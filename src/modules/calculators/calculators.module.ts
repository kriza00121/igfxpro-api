import { Module } from '@nestjs/common';
import { CalculatorsService } from './calculators.service';
import { CalculatorsController } from './calculators.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [CalculatorsService],
  controllers: [CalculatorsController],
  exports: [CalculatorsService],
})
export class CalculatorsModule {}
