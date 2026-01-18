import { WithdrawalsService } from './withdrawals.service';
export declare class WithdrawalsController {
    private readonly withdrawalsService;
    constructor(withdrawalsService: WithdrawalsService);
    createWithdrawal(req: any, body: {
        amount: number;
    }): Promise<{
        success: boolean;
        message: string;
        withdrawal: {
            id: string;
            status: import(".prisma/client").$Enums.WithdrawalStatus;
            createdAt: Date;
            walletId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            approvedBy: string | null;
            approvedAt: Date | null;
        };
    }>;
    getMyWithdrawals(req: any): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.WithdrawalStatus;
        createdAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        approvedBy: string | null;
        approvedAt: Date | null;
    }[]>;
    getPendingWithdrawals(): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.WithdrawalStatus;
        createdAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        approvedBy: string | null;
        approvedAt: Date | null;
    }[]>;
    approveWithdrawal(id: string, req: any): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.WithdrawalStatus;
        createdAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        approvedBy: string | null;
        approvedAt: Date | null;
    }>;
    rejectWithdrawal(id: string, req: any, body: {
        reason?: string;
    }): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.WithdrawalStatus;
        createdAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        approvedBy: string | null;
        approvedAt: Date | null;
    }>;
}
