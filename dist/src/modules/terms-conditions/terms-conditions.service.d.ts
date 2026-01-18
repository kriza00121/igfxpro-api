import { PrismaService } from '../../prisma/prisma.service';
export declare class TermsConditionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getContent(type: 'disclaimer' | 'policy' | 'terms'): Promise<{
        id: string;
        type: string;
        createdAt: Date;
        title: string;
        content: string;
        version: number;
        updatedAt: Date;
    }>;
}
