import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  sendEmail(to: string, subject: string, body: string) {
    return { ok: true, to, subject };
  }

  sendSms(to: string, message: string) {
    return { ok: true, to, message };
  }
}
