import React, { useEffect, useState } from 'react';
//import { User, getUsers } from '../../services/users';

import './CarDealTab.css';
import { CarModelInput } from './CarModelInput';
import { CarInsuranceInput } from './CarInsuranceInput';
import { CarDeal, SelectedCarModel } from '../../store/models/CarDeal';
import { Dispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { CarDownpaymentInput } from './CarDownpaymentInput';
import { InsurancePlan } from '../../api/CarInsurance.Client';
import { CarModel } from '../../api/CarInventory.Client';

type CarDealTabProps = {
    deal: CarDeal,
}

const getFinalPrice = (deal: CarDeal) => {
    const basePrice: number = deal.selectedModel?.basePrice || 0;
    const insuranceRates = deal.selectedInsurances.map(insurance => insurance.rate);
    const finalPrice = basePrice + insuranceRates.reduce((a, b) => a + (basePrice * b), 0)
    return finalPrice;
}

export const CarDealTab: React.FC<CarDealTabProps> = ({ deal }) => {
    const { carDeal: { changeDeal, updateSelectedModel } }: Dispatch = useDispatch();
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
                    <span>{deal.selectedModel && getFinalPrice(deal)}</span>
                </div>
            </div>
        </div>
    );
}
