import { financingClient } from "../../api/Financing.Client";
import { CarModel } from "../../api/CarInventory.Client";
import store from "..";
import { SelectedCarModel, DealType } from "./CarDeal";
import { InsurancePlan } from "../../api/CarInsurance.Client";

export interface CarDealCh {
    id: string,
    selectedModel: SelectedCarModel,
    selectedInsurances: InsurancePlan[],
    downpayment: number | null,
    minimumDownpayment: number,
    finalPrice: number | null,
    type: DealType
}

export const getFinalPrice = (deal: CarDealCh) => {
    const basePrice: number = deal.selectedModel?.basePrice || 0;
    const insuranceRates = deal.selectedInsurances.map(insurance => insurance.rate);
    const finalPrice = basePrice + insuranceRates.reduce((a, b) => a + (basePrice * b), 0)
    return finalPrice;
}

export const updateSelectedModel = async (deal: CarDealCh) => {
    const minimumDownpayment = deal.selectedModel ? await financingClient.getMinimumPossibleDownpayment(deal.selectedModel as CarModel, []) : 0;
    store.dispatch.carDeal.changeDeal({ ...deal, minimumDownpayment });
}