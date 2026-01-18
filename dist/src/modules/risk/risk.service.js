"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let RiskService = class RiskService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRiskEvent(accountId, type, level) {
        return this.prisma.riskEvent.create({
            data: {
                accountId,
                type,
                severity: level > 50 ? 'HIGH' : 'MEDIUM',
                message: `Risk event of type ${type}`,
            },
        });
    }
    async checkAccountRisk(accountId) {
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
            include: { wallet: true, trades: true },
        });
        if (!account)
            throw new Error('Account non trovato');
        if (account.wallet && account.wallet.equity.lt(account.wallet.marginUsed.mul(0.5))) {
            return this.createRiskEvent(accountId, client_1.RiskEventType.MARGIN_CALL, 50);
        }
        return null;
    }
};
exports.RiskService = RiskService;
exports.RiskService = RiskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RiskService);
//# sourceMappingURL=risk.service.js.map