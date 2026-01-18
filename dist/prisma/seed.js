"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const library_1 = require("@prisma/client/runtime/library");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🚀 Inizio seed operativo definitivo…');
    const adminPassword = await bcrypt.hash('AdminPassword123!', 10);
    const clientPassword = await bcrypt.hash('ClientPassword123!', 10);
    const ibPassword = await bcrypt.hash('IBPassword123!', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@igfxpro.com' },
        update: {},
        create: {
            id: 'ADMIN_USER',
            email: 'admin@igfxpro.com',
            password: adminPassword,
            role: client_1.RoleName.ADMIN,
            status: client_1.UserStatus.ACTIVE,
            name: 'Admin User'
        },
    });
    const client = await prisma.user.upsert({
        where: { email: 'client@igfxpro.com' },
        update: {},
        create: {
            id: 'CLIENT_USER',
            email: 'client@igfxpro.com',
            password: clientPassword,
            role: client_1.RoleName.CLIENT,
            status: client_1.UserStatus.ACTIVE,
            name: 'Client User'
        },
    });
    const ibUser = await prisma.user.upsert({
        where: { email: 'ib@igfxpro.com' },
        update: {},
        create: {
            id: 'IB_USER',
            email: 'ib@igfxpro.com',
            password: ibPassword,
            role: client_1.RoleName.BROKER,
            status: client_1.UserStatus.ACTIVE,
            name: 'Introducing Broker'
        },
    });
    const commissionPlan = await prisma.commissionPlan.upsert({
        where: { id: 'DEFAULT_PLAN' },
        update: {},
        create: {
            id: 'DEFAULT_PLAN',
            name: 'Default Plan',
            basePercentage: new library_1.Decimal(0.001),
            volumeBonus: new library_1.Decimal(0)
        },
    });
    const ib = await prisma.introducingBroker.upsert({
        where: { id: 'IB_1' },
        update: {},
        create: {
            id: 'IB_1',
            name: 'IB_1',
            email: ibUser.email,
            commissionPlan: 'DEFAULT_PLAN',
            isActive: true
        },
    });
    const clientReal = await prisma.account.upsert({
        where: { id: 'CLIENT_REAL_ACCOUNT' },
        update: {},
        create: {
            id: 'CLIENT_REAL_ACCOUNT',
            userId: client.id,
            type: client_1.AccountType.REAL,
            status: 'ACTIVE',
            currency: 'USD',
            leverage: 100,
        },
    });
    const clientDemo = await prisma.account.upsert({
        where: { id: 'CLIENT_DEMO_ACCOUNT' },
        update: {},
        create: {
            id: 'CLIENT_DEMO_ACCOUNT',
            userId: client.id,
            type: client_1.AccountType.DEMO,
            status: 'ACTIVE',
            currency: 'USD',
            leverage: 100,
        },
    });
    const clientRealWallet = await prisma.wallet.upsert({
        where: { id: 'CLIENT_REAL_WALLET' },
        update: {},
        create: {
            id: 'CLIENT_REAL_WALLET',
            accountId: clientReal.id,
            balance: new library_1.Decimal(0),
            available: new library_1.Decimal(0),
            marginUsed: new library_1.Decimal(0),
            equity: new library_1.Decimal(0),
            freeMargin: new library_1.Decimal(0),
        },
    });
    const clientDemoWallet = await prisma.wallet.upsert({
        where: { id: 'CLIENT_DEMO_WALLET' },
        update: {},
        create: {
            id: 'CLIENT_DEMO_WALLET',
            accountId: clientDemo.id,
            balance: new library_1.Decimal(10000),
            available: new library_1.Decimal(10000),
            marginUsed: new library_1.Decimal(0),
            equity: new library_1.Decimal(10000),
            freeMargin: new library_1.Decimal(10000),
        },
    });
    const marketsData = [
        { symbol: 'EURUSD', type: 'FOREX', spread: 0.2, swapLong: -1.2, swapShort: 0.8, id: 'EURUSD' },
        { symbol: 'BTCUSD', type: 'CRYPTO', spread: 25, swapLong: -10, swapShort: -10, id: 'BTCUSD' },
        { symbol: 'ETHUSD', type: 'CRYPTO', spread: 15, swapLong: -5, swapShort: -5, id: 'ETHUSD' },
        { symbol: 'USDJPY', type: 'FOREX', spread: 0.3, swapLong: -1.1, swapShort: 0.9, id: 'USDJPY' },
    ];
    for (const m of marketsData) {
        await prisma.market.upsert({
            where: { id: m.id },
            update: {},
            create: { ...m },
        });
    }
    const legalContents = [
        { type: 'TERMS', title: 'Terms of Service', content: 'Default terms content' },
        { type: 'PRIVACY', title: 'Privacy Policy', content: 'Default privacy content' },
        { type: 'DISCLAIMER', title: 'Disclaimer', content: 'Default disclaimer content' },
    ];
    for (const item of legalContents) {
        await prisma.legalContent.upsert({
            where: { id: item.type },
            update: {},
            create: { id: item.type, ...item, version: 1 },
        });
    }
    await prisma.companyStats.upsert({
        where: { id: 'COMPANY_STATS' },
        update: {},
        create: {
            id: 'COMPANY_STATS',
            year: new Date().getFullYear(),
            activeClients: 1,
            totalAccounts: 2,
            totalTrades: 0,
            totalVolume: new library_1.Decimal(0),
            totalCommission: new library_1.Decimal(0),
            activeAccounts: 2,
        },
    });
    await prisma.deposit.upsert({
        where: { id: 'INITIAL_DEPOSIT_CLIENT_REAL' },
        update: {},
        create: {
            id: 'INITIAL_DEPOSIT_CLIENT_REAL',
            walletId: clientRealWallet.id,
            amount: new library_1.Decimal(1000),
            method: 'Initial deposit',
            status: client_1.DepositStatus.APPROVED,
            approvedBy: admin.email,
            approvedAt: new Date(),
        },
    });
    await prisma.wallet.update({
        where: { id: clientRealWallet.id },
        data: {
            balance: { increment: new library_1.Decimal(1000) },
            available: { increment: new library_1.Decimal(1000) },
            equity: { increment: new library_1.Decimal(1000) },
            freeMargin: { increment: new library_1.Decimal(1000) },
        },
    });
    for (const m of marketsData) {
        const tradeId = `TRADE_${m.id}_1`;
        await prisma.trade.upsert({
            where: { id: tradeId },
            update: {},
            create: {
                id: tradeId,
                accountId: clientReal.id,
                marketId: m.id,
                symbol: m.symbol,
                type: client_1.TradeType.BUY,
                status: client_1.TradeStatus.OPEN,
                volume: new library_1.Decimal(0.01),
                price: new library_1.Decimal(1.1),
                entryPrice: new library_1.Decimal(1.1),
                pnl: new library_1.Decimal(0),
            },
        });
        await prisma.priceSnapshot.upsert({
            where: { id: tradeId },
            update: {},
            create: {
                id: tradeId,
                symbol: m.symbol,
                price: new library_1.Decimal(1.1),
                timestamp: new Date(),
            },
        });
    }
    await prisma.riskEvent.upsert({
        where: { id: 'RISK_MARGIN_CALL' },
        update: {},
        create: {
            id: 'RISK_MARGIN_CALL',
            accountId: clientReal.id,
            type: client_1.RiskEventType.LIQUIDATION_WARNING,
            severity: 'MEDIUM',
            message: 'Margin call warning',
        },
    });
    await prisma.riskEvent.upsert({
        where: { id: 'RISK_STOP_OUT' },
        update: {},
        create: {
            id: 'RISK_STOP_OUT',
            accountId: clientReal.id,
            type: client_1.RiskEventType.LIQUIDATION_EXECUTED,
            severity: 'HIGH',
            message: 'Stop out executed',
        },
    });
    console.log('🔥 SEED OPERATIVO DEFINITIVO COMPLETO! Puoi andare live!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map