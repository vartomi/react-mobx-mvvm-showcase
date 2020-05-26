import { InsurancePlan, carInsuranceClient } from '../../api/CarInsurance.Client';

type CarInsurance = {
    availableInsurances: InsurancePlan[]
}

export const carInsurance = {
    state: {
        availableInsurances: []
    },

    reducers: {
        setAvailableInsurances(state: CarInsurance, insurances: CarInsurance[]) {
            return { ...state, availableInsurances: insurances };
        }
    },

    effects: (dispatch: any) => ({
        async loadAvailableInsurances() {
            dispatch.carInsurance.setAvailableInsurances([]);
            const insurances = await carInsuranceClient.getAvaliableInsurancePlans();
            dispatch.carInsurance.setAvailableInsurances(insurances);
        }
    })
};
