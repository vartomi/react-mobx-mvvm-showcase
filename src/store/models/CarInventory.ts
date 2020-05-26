import { carInvenotryClient, CarModel } from '../../api/CarInventory.Client';

type CarInventory = {
    availableModels: CarModel[]
}

export const carInventory = {
    state: {
        availableModels: []
    },

    reducers: {
        setAvailableModels(state: CarInventory, models: CarModel[]) {
            return { ...state, availableModels: models };
        }
    },

    effects: (dispatch: any) => ({
        async loadAvailableModels() {
            dispatch.carInventory.setAvailableModels([]);
            const models = await carInvenotryClient.getAvaliableCarModels();
            dispatch.carInventory.setAvailableModels(models);
        }
    })
};
