import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  private settings = {} as Record<string, any>;

  get(key: string) {
    return this.settings[key];
  }

  set(key: string, value: any) {
    this.settings[key] = value;
    return this.settings[key];
  }
}
