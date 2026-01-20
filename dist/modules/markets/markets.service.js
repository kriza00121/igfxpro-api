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
exports.MarketsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MarketsService = class MarketsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getTickers() {
        return [{ symbol: 'BTC/USD', price: 50000 }, { symbol: 'ETH/USD', price: 3500 }];
    }
    getChart(symbol) {
        return { symbol, data: [] };
    }
    async submitMifid(userId, data) {
        return { success: true, message: 'MIFID submitted', userId, data };
    }
    async checkEligibility(userId) {
        return { eligible: true, userId };
    }
};
exports.MarketsService = MarketsService;
exports.MarketsService = MarketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarketsService);
//# sourceMappingURL=markets.service.js.map