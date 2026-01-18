import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('stats')
  async getStats(@Query('year') year?: number) {
    return this.companyService.getStats(year ? Number(year) : undefined);
  }

  @Post('stats')
  async addStats(@Body() body: any) {
    return this.companyService.addStats(body);
  }
}
