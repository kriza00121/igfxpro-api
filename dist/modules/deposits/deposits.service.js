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
exports.DepositsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let DepositsService = class DepositsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createDeposit({ userId, amount, method }) {
        const account = await this.prisma.account.findFirst({
            where: { userId, status: 'ACTIVE' },
            include: { wallet: true },
        });
        if (!account || !account.wallet)
            throw new common_1.BadRequestException('Active wallet not found');
        const deposit = await this.prisma.deposit.create({
            data: { walletId: account.wallet.id, amount, method, status: client_1.DepositStatus.PENDING },
        });
        return { success: true, message: 'Deposit request created', deposit };
    }
    async getUserDeposits(userId) {
        const deposits = await this.prisma.deposit.findMany({
            where: { wallet: { account: { userId } } },
            orderBy: { createdAt: 'desc' },
        });
        return deposits;
    }
    async getPendingDeposits() {
        return this.prisma.deposit.findMany({
            where: { status: client_1.DepositStatus.PENDING },
            orderBy: { createdAt: 'desc' },
        });
    }
    async approveDeposit(id, userId) {
        const deposit = await this.prisma.deposit.findUnique({ where: { id }, include: { wallet: true } });
        if (!deposit)
            throw new common_1.NotFoundException('Deposit not found');
        await this.prisma.wallet.update({
            where: { id: deposit.walletId },
            data: { balance: deposit.wallet.balance.add(deposit.amount) },
        });
        return this.prisma.deposit.update({
            where: { id },
            data: { status: client_1.DepositStatus.APPROVED },
        });
    }
    async rejectDeposit(id, userId, reason = '') {
        const deposit = await this.prisma.deposit.findUnique({ where: { id } });
        if (!deposit)
            throw new common_1.NotFoundException('Deposit not found');
        return this.prisma.deposit.update({
            where: { id },
            data: { status: client_1.DepositStatus.REJECTED },
        });
    }
};
exports.DepositsService = DepositsService;
exports.DepositsService = DepositsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepositsService);
//# sourceMappingURL=deposits.service.js.map