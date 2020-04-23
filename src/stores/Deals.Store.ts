import { computed, observable, action } from "mobx";
import { CarModel } from "../api/CarInventory.Client";
import { EnsurancePlanType, EnsurancePlan } from "../api/CarEnsurance.Client";
import { ReadonlyDeep, getArrayWithUpdatedItems } from "../util/state-helpers";

export type Deal = {
    id: number,
    carModel: CarModel | undefined,
    availableCarModels: CarModel[],
    selectedEnsurancePlanTypes: EnsurancePlanType[],
    availableInsurancePlans: EnsurancePlan[],
    downpayment: number | undefined,
    financingFinilizedToken: number | undefined,
    isLoading: boolean
}

// assume deal ids are unique enough, 
// in real app this would be a generated guid or we woud get the from back-end
let dealIdCounter = 0;

const initialDeal = createFreshDeal();

export function createFreshDeal(): Deal {
    return observable({
        id: (dealIdCounter += 1),
        carModel: undefined,
        availableCarModels: [],
        selectedEnsurancePlanTypes: [],
        availableInsurancePlans: [],
        downpayment: undefined,
        financingFinilizedToken: undefined,
        isLoading: false
    })
}

class DealsStore {

    @observable
    public activeDealId: number = 1;

    @observable
    public deals: Deal[] = [initialDeal];

    @action.bound
    public addNewDeal = () => {
        const newDeal = createFreshDeal();
        this.deals = [...this.deals, newDeal];
    }

    @computed
    public get getActiveDeal(): ReadonlyDeep<Deal> | undefined {
        // If we use setter function - we want to prevent devs
        // from accitdentally setting state in any other way, so, lets only give them ReadonlyDeep
        return this.deals.find(deal => deal.id === this.activeDealId);
    };

    @action.bound
    public closeActiveDeal(): void {
        this.deals = this.deals.filter(deal => deal.id !== this.activeDealId);
    }

    @action
    private updateActiveItem(update: Partial<Deal>) {
        this.deals = getArrayWithUpdatedItems(this.deals, i => i.id === this.activeDealId, update);
    }

    @action.bound
    public setActiveDealId(value: number) {
        this.activeDealId = value
    }

    @computed
    public get isLoading() {
        return this.getActiveDeal?.isLoading;
    }

    @action.bound
    public setIsLoading(value: boolean) {
        this.updateActiveItem({
            isLoading: value
        });
    }

    @computed
    public get carModel() {
        return this.getActiveDeal?.carModel;
    }

    @action.bound
    public setCarModel(value: CarModel | undefined) {
        this.updateActiveItem({
            carModel: value
        });
    }

    @computed
    public get availableInsurancePlans() {
        return this.getActiveDeal?.availableInsurancePlans ?? [];
    }

    @action.bound
    public setAvailableInsurancePlans(value: EnsurancePlan[]) {
        this.updateActiveItem({
            availableInsurancePlans: value
        });
    }

    @computed
    public get availableCarModels() {
        return this.getActiveDeal?.availableCarModels ?? [];
    }

    @action.bound
    public setAvailableCarModels(value: CarModel[]) {
        this.updateActiveItem({
            availableCarModels: value
        });
    }

    @computed
    public get selectedEnsurancePlanTypes() {
        return this.getActiveDeal?.selectedEnsurancePlanTypes ?? [];
    }


    @action.bound
    public setSelectedEnsurancePlanTypes(value: EnsurancePlanType[]) {
        this.updateActiveItem({
            selectedEnsurancePlanTypes: value
        });
    }

    @computed
    public get downpayment() {
        return this.getActiveDeal?.downpayment;
    }

    @action.bound
    public setDownPayment(value: number | undefined) {
        // notice, before the property name was wrong and compiler ignored it
        this.updateActiveItem({
            downpayment: value
        });
    }

    @computed
    public get financingFinilizedToken() {
        return this.getActiveDeal?.financingFinilizedToken;
    }

    @action.bound
    public setFinancingFinilizedToken(value: number | undefined) {
        this.updateActiveItem({
            financingFinilizedToken: value
        });
    }
}

export const dealsStore = new DealsStore();