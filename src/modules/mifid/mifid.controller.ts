import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MifidService } from './mifid.service';

@Controller('mifid')
export class MifidController {
  constructor(private readonly mifidService: MifidService) {}

  @UseGuards(JwtAuthGuard)
  @Post('submit')
  submit(@Req() req: any, @Body() body) {
    return this.mifidService.submitMifid(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Req() req: any) {
    return this.mifidService.getMifid(req.user.id);
  }
}
