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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let WalletService = class WalletService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWalletByAccount(accountId) {
        const wallet = await this.prisma.wallet.findUnique({
            where: { accountId },
        });
        if (!wallet)
            throw new common_1.NotFoundException('Wallet non trovato');
        return wallet;
    }
    async getWalletBalance(accountId) {
        const wallet = await this.getWalletByAccount(accountId);
        return {
            balance: Number(wallet.balance),
            available: Number(wallet.available),
            marginUsed: Number(wallet.marginUsed),
        };
    }
    async checkAvailable(accountId, requiredAmount) {
        const wallet = await this.getWalletByAccount(accountId);
        return new library_1.Decimal(wallet.available).greaterThanOrEqualTo(requiredAmount);
    }
    async updateWalletBalance(accountId, amountChange, marginChange = 0) {
        const wallet = await this.getWalletByAccount(accountId);
        return this.prisma.wallet.update({
            where: { id: wallet.id },
            data: {
                balance: { increment: amountChange },
                available: { increment: amountChange - marginChange },
                marginUsed: { increment: marginChange },
            },
        });
    }
    async getLedger(accountId) {
        const wallet = await this.getWalletByAccount(accountId);
        return this.prisma.ledgerEntry.findMany({
            where: { walletId: wallet.id },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getTransactions(accountId) {
        const wallet = await this.getWalletByAccount(accountId);
        const [deposits, withdrawals] = await Promise.all([
            this.prisma.deposit.findMany({
                where: { walletId: wallet.id },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.withdrawal.findMany({
                where: { walletId: wallet.id },
                orderBy: { createdAt: 'desc' },
            }),
        ]);
        return { deposits, withdrawals };
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map