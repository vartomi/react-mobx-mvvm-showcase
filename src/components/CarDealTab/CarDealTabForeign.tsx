import React from 'react';
import './CarDealTab.css';
import { CarModelInput } from './CarModelInput';
import { CarInsuranceInput } from './CarInsuranceInput';
import { SelectedCarModel } from '../../store/models/CarDeal';
import { Dispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { CarDownpaymentInput } from './CarDownpaymentInput';
import { CurrencyInput } from '../CurrencyInput';
import { InsurancePlan } from '../../api/CarInsurance.Client';
import { getFinalPrice, updateSelectedModel, CarDealForeign, Currency } from '../../store/models/CarDealForeign';

type CarDealTabProps = {
    deal: CarDealForeign,
}

export const CarDealTabForeign: React.FC<CarDealTabProps> = ({ deal }) => {
    const { carDeal: { changeDeal } }: Dispatch = useDispatch();
    
    return (
        <div className='car-deal-tab-container'>
            <CarModelInput
                selectedModel={deal.selectedModel}
                onSelect={(selectedModel: SelectedCarModel) => updateSelectedModel({ ...deal, selectedModel })} />
            <br />
            <CarInsuranceInput
                selectedInsurances={deal.selectedInsurances}
                onSelect={(selectedInsurances: InsurancePlan[]) => changeDeal({ ...deal, selectedInsurances })}
            />
            <br />
            <CarDownpaymentInput
                minimumDownpayment={deal.minimumDownpayment}
                value={deal.downpayment}
                onChange={(downpayment: number) => changeDeal({ ...deal, downpayment })}
            />
            <br />
            <CurrencyInput
                selectedCurrency={deal.currency}
                onSelect={(currency: Currency) => changeDeal({ ...deal, currency })}
            />
            <br />
            <div>
                <div className='car-deal-tab-property-label'>Final price</div>
                <div className='car-deal-tab-property-input'>
                    <span>{deal.selectedModel && getFinalPrice(deal) + deal.currency}</span>
                </div>
            </div>
        </div>
    );
}
