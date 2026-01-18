import { TermsConditionsService } from './terms-conditions.service';
export declare class TermsConditionsController {
    private readonly service;
    constructor(service: TermsConditionsService);
    getTerms(): Promise<{
        id: string;
        type: string;
        createdAt: Date;
        title: string;
        content: string;
        version: number;
        updatedAt: Date;
    }>;
}
