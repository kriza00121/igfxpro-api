import { Module } from '@nestjs/common';
import { PolicyPrivacyService } from './policy-privacy.service';
import { PolicyPrivacyController } from './policy-privacy.controller';

@Module({
  providers: [PolicyPrivacyService],
  controllers: [PolicyPrivacyController],
  exports: [PolicyPrivacyService],
})
export class PolicyPrivacyModule {}
