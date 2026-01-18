import { AccountsService } from './accounts.service';
import { AccountType } from '@prisma/client';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    createAccount(req: any, body: {
        type: AccountType;
        currency: string;
        leverage: number;
    }): Promise<{
        success: boolean;
        account: {
            wallet: {
                id: string;
                balance: import("@prisma/client/runtime/library").Decimal;
                available: import("@prisma/client/runtime/library").Decimal;
                marginUsed: import("@prisma/client/runtime/library").Decimal;
                equity: import("@prisma/client/runtime/library").Decimal;
                freeMargin: import("@prisma/client/runtime/library").Decimal;
                accountId: string;
            };
        } & {
            id: string;
            type: import(".prisma/client").$Enums.AccountType;
            status: import(".prisma/client").$Enums.AccountStatus;
            currency: string;
            leverage: number;
            createdAt: Date;
            userId: string;
        };
    }>;
    getMyAccounts(req: any): Promise<({
        wallet: {
            id: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            available: import("@prisma/client/runtime/library").Decimal;
            marginUsed: import("@prisma/client/runtime/library").Decimal;
            equity: import("@prisma/client/runtime/library").Decimal;
            freeMargin: import("@prisma/client/runtime/library").Decimal;
            accountId: string;
        };
    } & {
        id: string;
        type: import(".prisma/client").$Enums.AccountType;
        status: import(".prisma/client").$Enums.AccountStatus;
        currency: string;
        leverage: number;
        createdAt: Date;
        userId: string;
    })[]>;
    getAllAccounts(): Promise<({
        user: {
            id: string;
            status: import(".prisma/client").$Enums.UserStatus;
            createdAt: Date;
            name: string | null;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.RoleName;
            updatedAt: Date;
        };
        wallet: {
            id: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            available: import("@prisma/client/runtime/library").Decimal;
            marginUsed: import("@prisma/client/runtime/library").Decimal;
            equity: import("@prisma/client/runtime/library").Decimal;
            freeMargin: import("@prisma/client/runtime/library").Decimal;
            accountId: string;
        };
    } & {
        id: string;
        type: import(".prisma/client").$Enums.AccountType;
        status: import(".prisma/client").$Enums.AccountStatus;
        currency: string;
        leverage: number;
        createdAt: Date;
        userId: string;
    })[]>;
}
