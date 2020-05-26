import React, { useEffect, useState } from 'react';
//import { User, getUsers } from '../../services/users';

import './CarDealTab.css';
import { CarModelInput } from './CarModelInput';
import { CarInsuranceInput } from './CarInsuranceInput';
import { CarDeal } from '../../store/models/CarDeal';
import { Dispatch } from '../../store';
import { useDispatch } from 'react-redux';

type CarDealTabProps = {
    deal: CarDeal,
}

export const CarDealTab: React.FC<CarDealTabProps> = ({ deal }) => {
    const { carDeal: { updateDeal } }: Dispatch = useDispatch();
    return (
        <div className='car-deal-tab-container'>
            <CarModelInput selectedModelId={deal.selectedModelId} onSelect={({ target: { value } }) => updateDeal({ ...deal, selectedModelId: +value })} />
            <br />
            <CarInsuranceInput />
            <br />
        </div>
    );
}
