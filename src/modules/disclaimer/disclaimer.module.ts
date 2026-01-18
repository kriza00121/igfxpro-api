import { Module } from '@nestjs/common';
import { DisclaimerService } from './disclaimer.service';
import { DisclaimerController } from './disclaimer.controller';

@Module({
  providers: [DisclaimerService],
  controllers: [DisclaimerController],
  exports: [DisclaimerService],
})
export class DisclaimerModule {}
