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
exports.WithdrawalsController = void 0;
const common_1 = require("@nestjs/common");
const withdrawals_service_1 = require("./withdrawals.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
let WithdrawalsController = class WithdrawalsController {
    constructor(withdrawalsService) {
        this.withdrawalsService = withdrawalsService;
    }
    async createWithdrawal(req, body) {
        return this.withdrawalsService.createWithdrawal({
            userId: req.user.id,
            amount: body.amount,
        });
    }
    async getMyWithdrawals(req) {
        return this.withdrawalsService.getUserWithdrawals(req.user.id);
    }
    async getPendingWithdrawals() {
        return this.withdrawalsService.getPendingWithdrawals();
    }
    async approveWithdrawal(id, req) {
        return this.withdrawalsService.approveWithdrawal(id, req.user.id);
    }
    async rejectWithdrawal(id, req, body) {
        return this.withdrawalsService.rejectWithdrawal(id, req.user.id, body.reason);
    }
};
exports.WithdrawalsController = WithdrawalsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('client/withdrawals'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WithdrawalsController.prototype, "createWithdrawal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('client/withdrawals'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WithdrawalsController.prototype, "getMyWithdrawals", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.RoleName.ADMIN),
    (0, common_1.Get)('admin/withdrawals/pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WithdrawalsController.prototype, "getPendingWithdrawals", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.RoleName.ADMIN),
    (0, common_1.Post)('admin/withdrawals/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WithdrawalsController.prototype, "approveWithdrawal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.RoleName.ADMIN),
    (0, common_1.Post)('admin/withdrawals/:id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], WithdrawalsController.prototype, "rejectWithdrawal", null);
exports.WithdrawalsController = WithdrawalsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [withdrawals_service_1.WithdrawalsService])
], WithdrawalsController);
//# sourceMappingURL=withdrawals.controller.js.map