import { TradingService } from './trading.service';
import { TradeType } from '@prisma/client';
export declare class TradingController {
    private tradingService;
    constructor(tradingService: TradingService);
    openTrade(body: {
        accountId: string;
        marketId: string;
        symbol: string;
        type: TradeType;
        volume: number;
        price: number;
    }): Promise<{
        symbol: string;
        id: string;
        type: import(".prisma/client").$Enums.TradeType;
        status: import(".prisma/client").$Enums.TradeStatus;
        createdAt: Date;
        accountId: string;
        volume: import("@prisma/client/runtime/library").Decimal;
        price: import("@prisma/client/runtime/library").Decimal;
        entryPrice: import("@prisma/client/runtime/library").Decimal | null;
        exitPrice: import("@prisma/client/runtime/library").Decimal | null;
        pnl: import("@prisma/client/runtime/library").Decimal;
        openedAt: Date;
        closedAt: Date | null;
        marketId: string | null;
    }>;
    closeTrade(body: {
        tradeId: string;
        exitPrice: number;
    }): Promise<{
        symbol: string;
        id: string;
        type: import(".prisma/client").$Enums.TradeType;
        status: import(".prisma/client").$Enums.TradeStatus;
        createdAt: Date;
        accountId: string;
        volume: import("@prisma/client/runtime/library").Decimal;
        price: import("@prisma/client/runtime/library").Decimal;
        entryPrice: import("@prisma/client/runtime/library").Decimal | null;
        exitPrice: import("@prisma/client/runtime/library").Decimal | null;
        pnl: import("@prisma/client/runtime/library").Decimal;
        openedAt: Date;
        closedAt: Date | null;
        marketId: string | null;
    }>;
}
