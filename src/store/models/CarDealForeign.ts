import { CarModel } from "../../api/CarInventory.Client";
import { financingClient } from "../../api/Financing.Client";
import store from "..";
import { CarDealCh } from "./CarDealCh";

export enum Currency {
    EUR = 'EUR',
    USD = 'USD',
}

export interface CarDealForeign extends CarDealCh {
    currency: Currency,
}

export const updateSelectedModel = async (deal: CarDealForeign) => {
    const minimumDownpayment = deal.selectedModel
        ? await financingClient.getMinimumPossibleDownpayment((deal.selectedModel as CarModel), deal.selectedInsurances.map(ins => ins.type), deal.currency)
        : 0;
    store.dispatch.carDeal.changeDeal({ ...deal, minimumDownpayment });
}

export const currencyMultipliers = {
    [Currency.EUR]: 0.9,
    [Currency.USD]: 1.1
}

export const getFinalPrice = (deal: CarDealForeign) => {
    const basePrice: number = deal.selectedModel?.basePrice || 0;
    const insuranceRates = deal.selectedInsurances.map(insurance => insurance.rate);
    const finalPrice = basePrice + insuranceRates.reduce((a, b) => a + (basePrice * b), 0)

    return (finalPrice * currencyMultipliers[deal.currency]).toFixed(2);
}