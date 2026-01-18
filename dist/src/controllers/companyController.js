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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CompanyController = class CompanyController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCompanyStats() {
        const latest = await this.prisma.companyStats.findFirst({
            orderBy: { year: 'desc' },
        });
        return {
            activeClients: latest?.activeClients ?? 0,
            totalAccounts: latest?.totalAccounts ?? 0,
            totalVolume: latest?.totalVolume ?? 0,
            totalTrades: latest?.totalTrades ?? 0,
        };
    }
    async getCompanyHistory() {
        return this.prisma.companyStats.findMany({
            orderBy: { year: 'asc' },
        });
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanyStats", null);
__decorate([
    (0, common_1.Get)('history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanyHistory", null);
exports.CompanyController = CompanyController = __decorate([
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompanyController);
//# sourceMappingURL=companyController.js.map