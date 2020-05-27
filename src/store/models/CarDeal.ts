import { CarModel } from "../../api/CarInventory.Client";
import { financingClient } from "../../api/Financing.Client";

export type SelectedCarModel = CarModel | null;

export type CarDeal = {
    id: number,
    selectedModel: SelectedCarModel,
    selectedInsuranceId: number | null,
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
                    selectedModelId: null,
                    selectedInsuranceId: null,
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
        async updateDeal(deal: CarDeal) {
            if (deal.selectedModel) {
                const minimumDownpayment = await financingClient.getMinimumPossibleDownpayment(<CarModel>deal.selectedModel, []);
                deal.minimumDownpayment = minimumDownpayment;
            }

            dispatch.carDeal.changeDeal(deal);
        },
    })
}
