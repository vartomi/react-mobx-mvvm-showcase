import { DealType } from './CarDeal';
import { updateSelectedModel, Currency, CarDealForeign } from './CarDealForeign';
import store from '..';

jest.mock('..', () => ({
    dispatch: {
        carDeal: {
            changeDeal: jest.fn()
        }
    }
}))

describe('CarDeal model', () => {
    it('effect: updateSelectedModel', async () => {
    
        const testDeal: CarDealForeign = {
            id: 'cardeal-1',
            selectedModel: null,
            selectedInsurances: [],
            downpayment: 2000,
            minimumDownpayment: 0,
            currency: Currency.EUR,
            finalPrice: null,
            type: DealType.DealCh
        };
    
        await updateSelectedModel(testDeal);
    
        expect(store.dispatch.carDeal.changeDeal).toHaveBeenCalledWith({...testDeal});
    });
});