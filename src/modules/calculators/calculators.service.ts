import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorsService {
  calculateMargin(volume: number, leverage: number, price: number) {
    return (volume * price) / leverage;
  }

  calculatePnl(openPrice: number, closePrice: number, volume: number, type: 'LONG' | 'SHORT') {
    const diff = type === 'LONG' ? closePrice - openPrice : openPrice - closePrice;
    return diff * volume;
  }

  // puoi aggiungere altri calcoli CFD/Forex qui
}
