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
exports.TradingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
let TradingService = class TradingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async openTrade(accountId, marketId, symbol, type, volume, price) {
        const trade = await this.prisma.trade.create({
            data: {
                accountId,
                marketId,
                symbol,
                type,
                status: client_1.TradeStatus.OPEN,
                volume: new library_1.Decimal(volume),
                price: new library_1.Decimal(price),
                entryPrice: new library_1.Decimal(price),
            },
        });
        await this.prisma.priceSnapshot.create({
            data: {
                symbol,
                price: new library_1.Decimal(price),
                timestamp: new Date(),
            },
        });
        return trade;
    }
    async closeTrade(tradeId, exitPrice) {
        const trade = await this.prisma.trade.update({
            where: { id: tradeId },
            data: {
                status: client_1.TradeStatus.CLOSED,
                exitPrice: new library_1.Decimal(exitPrice),
                closedAt: new Date(),
            },
        });
        return trade;
    }
};
exports.TradingService = TradingService;
exports.TradingService = TradingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TradingService);
//# sourceMappingURL=trading.service.js.map