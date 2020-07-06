import { CarModel } from "../../api/CarInventory.Client";
import { CarDealForeign, Currency } from "./CarDealForeign";
import { CarDealCh } from "./CarDealCh";

export type SelectedCarModel = CarModel | null;

export type CarDeal = CarDealCh | CarDealForeign;

type CarDeals = {
    deals: CarDeal[]
}

export enum DealType {
    DealCh,
    DealForeign
}

export type CarDealState = CarDeals;

export const mapDealToTabHeader = (deal: CarDeal) => {
    const currency = (deal as CarDealForeign).currency || '';
    const tabName = deal.selectedModel?.description || `Deal ${deal.id.split('-')[1]}`;

    return {
        id: deal.id,
        title: [tabName, currency].join(' ')
    }
}

export const carDeal = {
    state: {
        deals: []
    },

    reducers: {
        createNewDealCh(state: CarDealState) {
            return {
                deals: [...state.deals, {
                    id: `cardealch-${state.deals.length}`,
                    selectedModel: null,
                    selectedInsurances: [],
                    downpayment: null,
                    finalPrice: null,
                    type: DealType.DealCh
                }]
            }
        },

        createNewDealForeign(state: CarDealState) {
            return {
                deals: [...state.deals, {
                    id: `cardealforeign-${state.deals.length}`,
                    selectedModel: null,
                    selectedInsurances: [],
                    downpayment: null,
                    currency: Currency.EUR,
                    finalPrice: null,
                    type: DealType.DealForeign
                }]
            }
        },

        changeDeal(state: CarDealState, deal: CarDeal) {
            return { deals: [...state.deals.map(d => d.id !== deal.id ? d : deal)] }
        },

        removeDeal(state: CarDealState, id: string) {
            console.log(state.deals, id)
            return { deals: [...state.deals.filter(d => d.id !== id)] }
        }
    },
}

