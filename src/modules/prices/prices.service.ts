import { Injectable } from '@nestjs/common';

@Injectable()
export class PricesService {
  getPrices() {
    return [
      { symbol: 'EURUSD', price: 1.0845 },
      { symbol: 'BTCUSD', price: 64230.5 },
      { symbol: 'XAUUSD', price: 2345.1 },
    ];
  }
}

