import { DepositsService } from './deposits.service';
export declare class DepositsController {
    private readonly depositsService;
    constructor(depositsService: DepositsService);
    createDeposit(req: any, body: {
        amount: number;
        method: string;
    }): Promise<{
        success: boolean;
        message: string;
        deposit: {
            id: string;
            status: import(".prisma/client").$Enums.DepositStatus;
            createdAt: Date;
            walletId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            method: string;
            approvedBy: string | null;
            approvedAt: Date | null;
        };
    }>;
    getMyDeposits(req: any): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.DepositStatus;
        createdAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        method: string;
        approvedBy: string | null;
        approvedAt: Date | null;
    }[]>;
    getPendingDeposits(): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.DepositStatus;
        createdAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        method: string;
        approvedBy: string | null;
        approvedAt: Date | null;
    }[]>;
    approveDeposit(id: string, req: any): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.DepositStatus;
        createdAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        method: string;
        approvedBy: string | null;
        approvedAt: Date | null;
    }>;
    rejectDeposit(id: string, req: any, body: {
        reason?: string;
    }): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.DepositStatus;
        createdAt: Date;
        walletId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        method: string;
        approvedBy: string | null;
        approvedAt: Date | null;
    }>;
}
