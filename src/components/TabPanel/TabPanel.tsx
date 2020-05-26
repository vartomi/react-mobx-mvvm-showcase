import React, { useState } from 'react';
import TabPanelHeader from './TabPanelHeader';
import { CarDealTab } from '../CarDealTab/CarDealTab';
import './TabPanel.css';
import { useSelector, useDispatch } from 'react-redux';
import { iRootState, Dispatch } from '../../store';
import { CarDeal } from '../../store/models/CarDeal';

export const TabPanel: React.FC = () => {
    const [selectedTab, setSelectedTab]: [number, any] = useState(0);
    const carDeals: CarDeal[] = useSelector((state: iRootState) => state.carDeal.deals);
    const { carDeal: { createNewDeal, removeDeal } }: Dispatch = useDispatch();

    const addNewTab = () => {
        createNewDeal();
    };

    const closeTab = (index: number) => {
        removeDeal(index);
    }

    return (
        <div className='tab-panel-container'>
            <TabPanelHeader tabs={carDeals} activeTab={selectedTab} setSelectedTab={setSelectedTab} onAddTab={addNewTab} onCloseTab={closeTab} />
            <div className='tab-panel-body'>
                {carDeals
                    .filter((carDeal: CarDeal) => carDeal.id === selectedTab)
                    .map((carDeal: CarDeal, index) => <CarDealTab key={`car-deal-${index}`} deal={carDeal} />)}
            </div>
        </div>
    );
}
