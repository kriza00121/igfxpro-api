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
exports.DepositsController = void 0;
const common_1 = require("@nestjs/common");
const deposits_service_1 = require("./deposits.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
let DepositsController = class DepositsController {
    constructor(depositsService) {
        this.depositsService = depositsService;
    }
    async createDeposit(req, body) {
        return this.depositsService.createDeposit({
            userId: req.user.id,
            amount: body.amount,
            method: body.method,
        });
    }
    async getMyDeposits(req) {
        return this.depositsService.getUserDeposits(req.user.id);
    }
    async getPendingDeposits() {
        return this.depositsService.getPendingDeposits();
    }
    async approveDeposit(id, req) {
        return this.depositsService.approveDeposit(id, req.user.id);
    }
    async rejectDeposit(id, req, body) {
        return this.depositsService.rejectDeposit(id, req.user.id, body.reason);
    }
};
exports.DepositsController = DepositsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('client/deposits'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepositsController.prototype, "createDeposit", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('client/deposits'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepositsController.prototype, "getMyDeposits", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.RoleName.ADMIN),
    (0, common_1.Get)('admin/deposits/pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepositsController.prototype, "getPendingDeposits", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.RoleName.ADMIN),
    (0, common_1.Post)('admin/deposits/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepositsController.prototype, "approveDeposit", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.RoleName.ADMIN),
    (0, common_1.Post)('admin/deposits/:id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositsController.prototype, "rejectDeposit", null);
exports.DepositsController = DepositsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [deposits_service_1.DepositsService])
], DepositsController);
//# sourceMappingURL=deposits.controller.js.map