import { Controller, Get, Param } from '@nestjs/common';
import { TermsConditionsService } from './terms-conditions.service';
import { LegalService } from '../policy-privacy/legal.service';

@Controller('terms-conditions')
export class TermsConditionsController {
  constructor(private readonly service: TermsConditionsService) {}

  @Get()
  async getTerms() {
    return this.service.getContent('terms');
  }
}
