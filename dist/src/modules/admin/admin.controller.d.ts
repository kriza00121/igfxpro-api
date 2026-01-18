import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(): Promise<({
        accounts: {
            id: string;
            status: import(".prisma/client").$Enums.AccountStatus;
            createdAt: Date;
            userId: string;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string;
            leverage: number;
        }[];
    } & {
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: import(".prisma/client").$Enums.RoleName;
        status: import(".prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getUser(id: string): Promise<{
        accounts: {
            id: string;
            status: import(".prisma/client").$Enums.AccountStatus;
            createdAt: Date;
            userId: string;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string;
            leverage: number;
        }[];
    } & {
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: import(".prisma/client").$Enums.RoleName;
        status: import(".prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
