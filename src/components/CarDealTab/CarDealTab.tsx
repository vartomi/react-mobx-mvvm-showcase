import React, { useEffect, useState } from 'react';
//import { User, getUsers } from '../../services/users';

import './CarDealTab.css';
import { CarModelInput } from './CarModelInput';
import { CarInsuranceInput } from './CarInsuranceInput';
import { CarDeal, SelectedCarModel } from '../../store/models/CarDeal';
import { Dispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { CarDownpaymentInput } from './CarDownpaymentInput';

type CarDealTabProps = {
    deal: CarDeal,
}

export const CarDealTab: React.FC<CarDealTabProps> = ({ deal }) => {
    const { carDeal: { updateDeal } }: Dispatch = useDispatch();
    return (
        <div className='car-deal-tab-container'>
            <CarModelInput selectedModel={deal.selectedModel} onSelect={(selectedModel: SelectedCarModel) => updateDeal({ ...deal, selectedModel })} />
            <br />
            <CarInsuranceInput />
            <br />
            <CarDownpaymentInput
                minimumDownpayment={deal.minimumDownpayment}
                value={deal.downpayment} />
        </div>
    );
}
