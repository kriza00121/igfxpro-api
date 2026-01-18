import { Controller, Get, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('company/:year')
  company(@Param('year') year: string) {
    return this.reportsService.companyReport(Number(year));
  }
}
