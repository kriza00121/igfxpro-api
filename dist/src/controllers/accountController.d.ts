import { PrismaService } from '../prisma/prisma.service';
import { AccountType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
export declare class AccountController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createAccount(req: any, body: {
        currency: string;
        leverage: number;
        type: AccountType;
    }): Promise<{
        success: boolean;
        message: string;
        account: {
            wallet: {
                id: string;
                balance: Decimal;
                available: Decimal;
                marginUsed: Decimal;
                equity: Decimal;
                freeMargin: Decimal;
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
            balance: Decimal;
            available: Decimal;
            marginUsed: Decimal;
            equity: Decimal;
            freeMargin: Decimal;
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
            balance: Decimal;
            available: Decimal;
            marginUsed: Decimal;
            equity: Decimal;
            freeMargin: Decimal;
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
