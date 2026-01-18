import { PrismaService } from '../../prisma/prisma.service';
import { LedgerType } from '@prisma/client';
export declare class LedgerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getWalletLedger(walletId: string): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.LedgerType;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        reference: string | null;
    }[]>;
    createEntry(walletId: string, type: LedgerType, amount: number, reference?: string): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.LedgerType;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        reference: string | null;
    }>;
}
