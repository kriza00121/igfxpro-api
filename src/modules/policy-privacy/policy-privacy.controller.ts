import { Controller, Get, Param } from '@nestjs/common';
import { PolicyPrivacyService } from './policy-privacy.service';

@Controller('policy-privacy')
export class PolicyPrivacyController {
  constructor(private readonly policyPrivacyService: PolicyPrivacyService) {}

  @Get()
  async getPolicies() {
    return this.policyPrivacyService.getPolicies();
  }
}
