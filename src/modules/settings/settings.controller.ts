import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private s: SettingsService) {}

  @Get(':key')
  get(@Param('key') key: string) {
    return this.s.get(key);
  }

  @Post(':key')
  set(@Param('key') key: string, @Body() body: { value: any }) {
    return this.s.set(key, body.value);
  }
}
