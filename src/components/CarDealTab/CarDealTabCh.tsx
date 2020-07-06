import React from 'react';
import './CarDealTab.css';
import { CarModelInput } from './CarModelInput';
import { CarInsuranceInput } from './CarInsuranceInput';
import { SelectedCarModel } from '../../store/models/CarDeal';
import { Dispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { CarDownpaymentInput } from './CarDownpaymentInput';
import { InsurancePlan } from '../../api/CarInsurance.Client';
import { getFinalPrice, updateSelectedModel, CarDealCh } from '../../store/models/CarDealCh';

type CarDealTabChProps = {
    deal: CarDealCh,
}

export const CarDealTabCh: React.FC<CarDealTabChProps> = ({ deal }) => {
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
            <div>
                <div className='car-deal-tab-property-label'>Final price</div>
                <div className='car-deal-tab-property-input'>
                    <span>{deal.selectedModel && getFinalPrice(deal) + ' CHF'}</span>
                </div>
            </div>
        </div>
    );
}
