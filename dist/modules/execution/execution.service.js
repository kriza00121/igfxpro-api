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
exports.ExecutionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
let ExecutionService = class ExecutionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async executeOrder({ accountId, marketId, volume, type, price, }) {
        return this.prisma.$transaction(async (tx) => {
            const account = await tx.account.findUnique({ where: { id: accountId }, include: { wallet: true } });
            if (!account || !account.wallet)
                throw new common_1.BadRequestException('Account o wallet non trovato');
            const market = await tx.market.findUnique({ where: { id: marketId } });
            if (!market)
                throw new common_1.BadRequestException('Mercato non trovato');
            const requiredMargin = new library_1.Decimal(volume).mul(price ?? 0).div(account.leverage);
            if (new library_1.Decimal(account.wallet.available).lessThan(requiredMargin)) {
                throw new common_1.BadRequestException('Fondi insufficienti');
            }
            const trade = await tx.trade.create({
                data: {
                    accountId,
                    marketId,
                    symbol: 'EUR/USD',
                    volume,
                    price: price ?? 0,
                    pnl: 0,
                    type: type,
                },
            });
            await tx.wallet.update({
                where: { id: account.wallet.id },
                data: {
                    marginUsed: { increment: requiredMargin.toNumber() },
                    available: { decrement: requiredMargin.toNumber() },
                },
            });
            await tx.ledgerEntry.create({
                data: {
                    walletId: account.wallet.id,
                    type: client_1.LedgerType.TRADE_PNL,
                    amount: 0,
                    reference: trade.id,
                },
            });
            return { success: true, trade };
        });
    }
    async closeTrade(tradeId) {
        return this.prisma.$transaction(async (tx) => {
            const trade = await tx.trade.findUnique({
                where: { id: tradeId },
                include: { account: { include: { wallet: true } }, market: true },
            });
            if (!trade)
                throw new common_1.NotFoundException('Trade non trovato');
            const wallet = trade.account.wallet;
            const marketPrice = trade.price;
            const pnl = trade.type === 'BUY'
                ? new library_1.Decimal(marketPrice).sub(trade.price).mul(trade.volume)
                : new library_1.Decimal(trade.price).sub(marketPrice).mul(trade.volume);
            await tx.wallet.update({
                where: { id: wallet.id },
                data: {
                    balance: { increment: pnl.toNumber() },
                    available: { increment: pnl.toNumber() },
                    marginUsed: { decrement: trade.volume.toNumber() },
                },
            });
            await tx.trade.update({
                where: { id: trade.id },
                data: { pnl: pnl.toNumber() },
            });
            await tx.ledgerEntry.create({
                data: {
                    walletId: wallet.id,
                    type: client_1.LedgerType.TRADE_PNL,
                    amount: pnl.toNumber(),
                    reference: trade.id,
                },
            });
            return { success: true, tradeId, pnl: pnl.toNumber() };
        });
    }
    async getAllTrades() {
        return this.prisma.trade.findMany({
            include: { account: true, market: true },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.ExecutionService = ExecutionService;
exports.ExecutionService = ExecutionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExecutionService);
//# sourceMappingURL=execution.service.js.map