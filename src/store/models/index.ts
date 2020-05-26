
import { carInventory } from './CarInventory';
import { carDeal } from './CarDeal';
import { carInsurance } from './CarInsurance';

export interface RootModel {
    carDeal: typeof carDeal,
    carInsurance: typeof carInsurance,
    carInventory: typeof carInventory,
}

export const models: RootModel = {
    carInventory,
    carInsurance,
    carDeal,
}