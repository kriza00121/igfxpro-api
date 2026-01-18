import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { KycService } from './kyc.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('kyc')
@UseGuards(JwtAuthGuard)
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Post('submit')
  async submit(@Body() body: any) {
    return this.kycService.submitKyc(body.userId, body);
  }

  @Post('review/:userId')
  async review(@Param('userId') userId: string, @Body() body: { status: 'APPROVED' | 'REJECTED'; reviewerId: string }) {
    return this.kycService.reviewKyc(userId, body.status, body.reviewerId);
  }
}
