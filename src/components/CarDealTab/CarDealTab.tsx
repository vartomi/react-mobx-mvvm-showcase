import React from 'react';
import './CarDealTab.css';
import { CarDeal, DealType } from '../../store/models/CarDeal';
import { CarDealTabCh } from './CarDealTabCh';
import { CarDealTabForeign } from './CarDealTabForeign';
import { CarDealForeign } from '../../store/models/CarDealForeign';

type CarDealTabProps = {
    deal: CarDeal,
}

export const CarDealTab: React.FC<CarDealTabProps> = ({ deal }) => {
    switch (deal.type) {
        case DealType.DealCh: return <CarDealTabCh deal={deal} />
        case DealType.DealForeign: return <CarDealTabForeign deal={deal as CarDealForeign} />
        default: return null
    }
}
