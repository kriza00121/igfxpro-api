import { LedgerService } from './ledger.service';
export declare class LedgerController {
    private readonly ledgerService;
    constructor(ledgerService: LedgerService);
    getLedger(walletId: string): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.LedgerType;
        createdAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        reference: string | null;
    }[]>;
    createEntry(body: {
        walletId: string;
        type: string;
        amount: number;
        reference?: string;
    }): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.LedgerType;
        createdAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        reference: string | null;
    }>;
}
