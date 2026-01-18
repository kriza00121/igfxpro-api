import { RiskService } from './risk.service';
import { RiskEventType } from '@prisma/client';
export declare class RiskController {
    private riskService;
    constructor(riskService: RiskService);
    createRisk(body: {
        accountId: string;
        type: RiskEventType;
        level: number;
    }): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.RiskEventType;
        accountId: string | null;
        severity: string;
        message: string;
        resolved: boolean;
        createdAt: Date;
        resolvedAt: Date | null;
    }>;
    checkRisk(body: {
        accountId: string;
    }): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.RiskEventType;
        accountId: string | null;
        severity: string;
        message: string;
        resolved: boolean;
        createdAt: Date;
        resolvedAt: Date | null;
    }>;
}
