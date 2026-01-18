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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
let AccountsService = class AccountsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAccount(userId, type, currency, leverage) {
        return this.prisma.account.create({
            data: {
                userId,
                type,
                currency,
                leverage,
                status: client_1.AccountStatus.INACTIVE,
                wallet: {
                    create: {
                        balance: new library_1.Decimal(0),
                        available: new library_1.Decimal(0),
                        marginUsed: new library_1.Decimal(0),
                        equity: new library_1.Decimal(0),
                        freeMargin: new library_1.Decimal(0),
                    },
                },
            },
            include: { wallet: true },
        });
    }
    async getAccountsByUser(userId) {
        return this.prisma.account.findMany({
            where: { userId },
            include: { wallet: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getAllAccounts() {
        return this.prisma.account.findMany({
            include: { user: true, wallet: true },
        });
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map