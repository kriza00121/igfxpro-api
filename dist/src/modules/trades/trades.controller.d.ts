import { TradesService } from './trades.service';
export declare class TradesController {
    private tradesService;
    constructor(tradesService: TradesService);
    getAll(): Promise<({
        account: {
            id: string;
            type: import(".prisma/client").$Enums.AccountType;
            status: import(".prisma/client").$Enums.AccountStatus;
            currency: string;
            leverage: number;
            createdAt: Date;
            userId: string;
        };
        market: {
            symbol: string;
            id: string;
            type: string | null;
            createdAt: Date;
            name: string | null;
            updatedAt: Date;
            spread: number;
            swapLong: number;
            swapShort: number;
            minVolume: number | null;
            maxVolume: number | null;
        };
    } & {
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
    })[]>;
    getOne(id: string): Promise<{
        account: {
            id: string;
            type: import(".prisma/client").$Enums.AccountType;
            status: import(".prisma/client").$Enums.AccountStatus;
            currency: string;
            leverage: number;
            createdAt: Date;
            userId: string;
        };
        market: {
            symbol: string;
            id: string;
            type: string | null;
            createdAt: Date;
            name: string | null;
            updatedAt: Date;
            spread: number;
            swapLong: number;
            swapShort: number;
            minVolume: number | null;
            maxVolume: number | null;
        };
    } & {
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
