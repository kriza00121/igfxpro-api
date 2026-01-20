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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let WalletController = class WalletController {
    constructor(walletService, prisma) {
        this.walletService = walletService;
        this.prisma = prisma;
    }
    async getWallet(accountId) {
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
            include: { wallet: true },
        });
        if (!account || !account.wallet) {
            throw new common_1.BadRequestException('Wallet non trovato per questo account');
        }
        const wallet = account.wallet;
        return {
            balance: new library_1.Decimal(wallet.balance).toNumber(),
            available: new library_1.Decimal(wallet.available).toNumber(),
            marginUsed: new library_1.Decimal(wallet.marginUsed).toNumber(),
        };
    }
    async checkAvailable(accountId, required) {
        const requiredNumber = Number(required);
        if (isNaN(requiredNumber))
            throw new common_1.BadRequestException('Parametro required non valido');
        await this.walletService.checkAvailable(accountId, requiredNumber);
        return { success: true, message: 'Fondi sufficienti', required: requiredNumber };
    }
    async getLedger(accountId) {
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
            include: { wallet: { include: { ledger: true } } },
        });
        if (!account || !account.wallet) {
            throw new common_1.BadRequestException('Wallet non trovato per questo account');
        }
        const ledger = account.wallet.ledger.map((entry) => ({
            type: entry.type,
            amount: new library_1.Decimal(entry.amount).toNumber(),
            reference: entry.reference,
            createdAt: entry.createdAt,
        }));
        return ledger;
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, common_1.Get)(':accountId'),
    __param(0, (0, common_1.Param)('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Get)(':accountId/check'),
    __param(0, (0, common_1.Param)('accountId')),
    __param(1, (0, common_1.Query)('required')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "checkAvailable", null);
__decorate([
    (0, common_1.Get)(':accountId/ledger'),
    __param(0, (0, common_1.Param)('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getLedger", null);
exports.WalletController = WalletController = __decorate([
    (0, common_1.Controller)('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService,
        prisma_service_1.PrismaService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map