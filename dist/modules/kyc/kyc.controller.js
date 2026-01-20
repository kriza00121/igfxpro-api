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
exports.KycController = void 0;
const common_1 = require("@nestjs/common");
const kyc_service_1 = require("./kyc.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let KycController = class KycController {
    constructor(kycService) {
        this.kycService = kycService;
    }
    async submit(body) {
        return this.kycService.submitKyc(body.userId, body);
    }
    async review(userId, body) {
        return this.kycService.reviewKyc(userId, body.status, body.reviewerId);
    }
};
exports.KycController = KycController;
__decorate([
    (0, common_1.Post)('submit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)('review/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "review", null);
exports.KycController = KycController = __decorate([
    (0, common_1.Controller)('kyc'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [kyc_service_1.KycService])
], KycController);
//# sourceMappingURL=kyc.controller.js.map