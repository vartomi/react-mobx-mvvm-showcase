export type CarDeal = {
    id: number,
    selectedModelId: number | null,
    selectedInsuranceId: number | null,
    downPayment: number | null,
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
                    downPayment: null,
                    finalPrice: null,
                }]
            }
        },

        updateDeal(state: CarDealState, deal: CarDeal) {
            return { deals: [...state.deals.map(d => d.id !== deal.id ? d : deal)] }
        },

        removeDeal(state: CarDealState, id: number) {
            return { deals: [...state.deals.filter(d => d.id !== id)] }
        }
    }
}
