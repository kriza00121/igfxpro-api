import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private svc: NotificationsService) {}

  @Post('email')
  email(@Body() body: { to: string; subject: string; body: string }) {
    return this.svc.sendEmail(body.to, body.subject, body.body);
  }

  @Post('sms')
  sms(@Body() body: { to: string; message: string }) {
    return this.svc.sendSms(body.to, body.message);
  }
}
