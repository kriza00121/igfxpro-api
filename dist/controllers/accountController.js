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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_auth_guard_1 = require("../modules/auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../modules/auth/guards/roles.guard");
const roles_decorator_1 = require("../modules/auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
let AccountController = class AccountController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAccount(req, body) {
        const userId = req.user.id;
        const account = await this.prisma.account.create({
            data: {
                userId,
                type: body.type,
                currency: body.currency ?? 'USD',
                leverage: body.leverage,
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
        return {
            success: true,
            message: `Account ${body.type} created`,
            account,
        };
    }
    async getMyAccounts(req) {
        return this.prisma.account.findMany({
            where: { userId: req.user.id },
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
exports.AccountController = AccountController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "createAccount", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getMyAccounts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.RoleName.ADMIN),
    (0, common_1.Get)('admin/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAllAccounts", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('accounts'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountController);
//# sourceMappingURL=accountController.js.map