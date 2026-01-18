import { Controller, Get } from '@nestjs/common';
import { DisclaimerService } from './disclaimer.service';

@Controller('disclaimer')
export class DisclaimerController {
  constructor(private readonly disclaimerService: DisclaimerService) {}

  @Get()
  get() {
    return this.disclaimerService.get();
  }
}
