import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AccountsModule } from './modules/accounts/accounts.module';
// import { WalletModule } from './modules/wallet/wallet.module';
import { TradingModule } from './modules/trading/trading.module';
import { TradesModule } from './modules/trades/trades.module';
import { MarketsModule } from './modules/markets/markets.module';
// import { AdminModule } from './modules/admin/admin.module';
import { RiskModule } from './modules/risk/risk.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Core modules
    PrismaModule,
    
    // Feature modules (solo quelli che esistono)
    AuthModule,
    UsersModule,
    AccountsModule,
    // WalletModule,
    TradingModule,
    TradesModule,
    MarketsModule,
    // AdminModule,
    RiskModule,
    HealthModule,
  ],
})
export class AppModule {}