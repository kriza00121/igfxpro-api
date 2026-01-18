import { Controller, Get } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('company-stats')
  async companyStats() {
    return this.publicService.getCompanyStats();
  }

  @Get('markets')
  async markets() {
    return this.publicService.getMarkets();
  }
}
