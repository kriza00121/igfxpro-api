import { Injectable } from '@nestjs/common';

@Injectable()
export class PlatformsService {
  getPlatforms() {
    return [
      { name: 'IGFX WebTrader', type: 'WEB', status: 'ACTIVE' },
      { name: 'TradingView', type: 'CHART', status: 'CONNECTED' },
      { name: 'Mobile App', type: 'APP', status: 'COMING_SOON' },
    ];
  }
}

