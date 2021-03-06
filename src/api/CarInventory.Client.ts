import { delay } from "../util/delay";
import { Lazy } from "../util/util";

export type CarModel = {
    id: number,
    description: string,
    basePriceUSD: number
}

class CarInventoryClient {

    public async getAvaliableCarModels(): Promise<CarModel[]> {
        console.log(`server call getAvaliableCarModels`);
        await delay(500);
        return [
            {
                id: 1,
                description: 'Ford Mustang',
                basePriceUSD: 100000
            },
            {
                id: 2,
                description: 'Kia Sorento',
                basePriceUSD: 26000
            },
            {
                id: 3,
                description: 'Porsche Cayene',
                basePriceUSD: 90000
            }
        ]
    }
}


export const carInvenotryClient = new Lazy(() => new CarInventoryClient());