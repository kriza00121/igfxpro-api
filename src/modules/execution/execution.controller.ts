import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('execution')
export class ExecutionController {
  constructor(private readonly executionService: ExecutionService) {}

  /**
   * CLIENT → ESEGUE ORDINE
   */
  @UseGuards(JwtAuthGuard)
  @Post('order')
  async placeOrder(
    @Req() req: any,
    @Body()
    body: {
      marketId: string;
      volume: number;
      type: 'BUY' | 'SELL';
      price?: number;
    },
  ) {
    return this.executionService.executeOrder({
      accountId: req.user.activeAccountId,
      marketId: body.marketId,
      volume: body.volume,
      type: body.type,
      price: body.price,
    });
  }
}
