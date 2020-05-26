import { delay } from "../util/delay";


export enum InsurancePlanType {
    base, thridParty, assetProtection
}

export type InsurancePlan = {
    id: number,
    type: InsurancePlanType,
    description: string,
    rate: number
}

class CarInsuranceClient {
    public async getAvaliableInsurancePlans(): Promise<InsurancePlan[]> {
        console.log(`server call getAvaliableInsurancePlans`);
        await delay(1500);
        return [{
            id: 1,
            type: InsurancePlanType.base,
            description: 'base plan',
            rate: 0.05
        }, {
            id: 2,
            type: InsurancePlanType.thridParty,
            description: '3rd-party liability',
            rate: 0.05
        }, {
            id: 3,
            type: InsurancePlanType.assetProtection,
            description: 'asset protection',
            rate: 0.3
        }];
    }
}

export const carInsuranceClient = new CarInsuranceClient();