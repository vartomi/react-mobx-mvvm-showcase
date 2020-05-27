import { CarModel } from "../../api/CarInventory.Client";
import { financingClient } from "../../api/Financing.Client";
import { InsurancePlan } from "../../api/CarInsurance.Client";

export type SelectedCarModel = CarModel | null;

export type CarDeal = {
    id: number,
    selectedModel: SelectedCarModel,
    selectedInsurances: InsurancePlan[],
    downpayment: number | null,
    minimumDownpayment: number,
    finalPrice: number | null,
}

type CarDeals = {
    deals: CarDeal[]
}

export type CarDealState = CarDeals;

export const carDeal = {
    state: {
        deals: []
    },

    reducers: {
        createNewDeal(state: CarDealState) {
            return {
                deals: [...state.deals, {
                    id: state.deals.length,
                    selectedModel: null,
                    selectedInsurances: [],
                    downpayment: null,
                    finalPrice: null,
                }]
            }
        },

        changeDeal(state: CarDealState, deal: CarDeal) {
            return { deals: [...state.deals.map(d => d.id !== deal.id ? d : deal)] }
        },

        removeDeal(state: CarDealState, id: number) {
            return { deals: [...state.deals.filter(d => d.id !== id)] }
        }
    },

    effects: (dispatch: any) => ({
        async updateSelectedModel(deal: CarDeal) {
            const minimumDownpayment = deal.selectedModel ? await financingClient.getMinimumPossibleDownpayment(<CarModel>deal.selectedModel, []) : null;
            dispatch.carDeal.changeDeal({ ...deal, minimumDownpayment });
        },
    })
}

export const getFinalPrice = (deal: CarDeal) => {
    const basePrice: number = deal.selectedModel?.basePrice || 0;
    const insuranceRates = deal.selectedInsurances.map(insurance => insurance.rate);
    const finalPrice = basePrice + insuranceRates.reduce((a, b) => a + (basePrice * b), 0)
    return finalPrice;
}