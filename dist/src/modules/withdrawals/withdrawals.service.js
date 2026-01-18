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
exports.WithdrawalsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
let WithdrawalsService = class WithdrawalsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createWithdrawal({ userId, amount }) {
        const account = await this.prisma.account.findFirst({
            where: { userId, status: 'ACTIVE' },
            include: { wallet: true },
        });
        if (!account || !account.wallet)
            throw new common_1.BadRequestException('Active wallet not found');
        if (new library_1.Decimal(account.wallet.available).lessThan(amount)) {
            throw new common_1.BadRequestException('Insufficient funds');
        }
        const withdrawal = await this.prisma.withdrawal.create({
            data: { walletId: account.wallet.id, amount, status: client_1.WithdrawalStatus.PENDING },
        });
        return { success: true, message: 'Withdrawal request created', withdrawal };
    }
    async getUserWithdrawals(userId) {
        return this.prisma.withdrawal.findMany({
            where: { wallet: { account: { userId } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getPendingWithdrawals() {
        return this.prisma.withdrawal.findMany({
            where: { status: client_1.WithdrawalStatus.PENDING },
            orderBy: { createdAt: 'desc' },
        });
    }
    async approveWithdrawal(id, userId) {
        const withdrawal = await this.prisma.withdrawal.findUnique({ where: { id }, include: { wallet: true } });
        if (!withdrawal)
            throw new common_1.NotFoundException('Withdrawal not found');
        await this.prisma.wallet.update({
            where: { id: withdrawal.walletId },
            data: { available: new library_1.Decimal(withdrawal.wallet.available).minus(withdrawal.amount) },
        });
        return this.prisma.withdrawal.update({
            where: { id },
            data: { status: client_1.WithdrawalStatus.APPROVED, approvedBy: userId, approvedAt: new Date() },
        });
    }
    async rejectWithdrawal(id, userId, reason) {
        const withdrawal = await this.prisma.withdrawal.findUnique({ where: { id } });
        if (!withdrawal)
            throw new common_1.NotFoundException('Withdrawal not found');
        return this.prisma.withdrawal.update({
            where: { id },
            data: { status: client_1.WithdrawalStatus.REJECTED, approvedBy: userId },
        });
    }
};
exports.WithdrawalsService = WithdrawalsService;
exports.WithdrawalsService = WithdrawalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WithdrawalsService);
//# sourceMappingURL=withdrawals.service.js.map