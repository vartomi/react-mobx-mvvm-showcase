import React, { useState, useEffect } from 'react';
import { CarDealTab } from '../CarDealTab/CarDealTab';
import { useSelector, useDispatch } from 'react-redux';
import { iRootState, Dispatch } from '../../store';
import { CarDeal } from '../../store/models/CarDeal';
import { TabPanel } from '../TabPanel/TabPanel';

export const CarDealTabPanel: React.FC = () => {
    const [selectedTab, setSelectedTab]: [number, any] = useState(0);
    const carDeals: CarDeal[] = useSelector((state: iRootState) => state.carDeal.deals);
    const { carDeal: { createNewDeal, removeDeal } }: Dispatch = useDispatch();

    const addNewTab = () => {
        createNewDeal();
    };

    const closeTab = (index: number) => {
        removeDeal(index);
    };

    useEffect(() => {
        if (carDeals.length < 1) return;
        if (!carDeals.map(deal => deal.id).includes(selectedTab)) {
            setSelectedTab(carDeals[0].id);
        }
    }, [carDeals.length])

    return (
        <TabPanel>
            <TabPanel.Header
                tabs={carDeals.map((deal: CarDeal) => ({ id: deal.id, title: deal.selectedModel?.description || '' }))}
                activeTab={selectedTab}
                setSelectedTab={setSelectedTab}
                onAddTab={addNewTab}
                onCloseTab={closeTab} />
            <TabPanel.Body>
                {carDeals
                    .filter((carDeal: CarDeal) => carDeal.id === selectedTab)
                    .map((carDeal: CarDeal, index) => <CarDealTab key={`car-deal-${index}`} deal={carDeal} />)}
            </TabPanel.Body>
        </TabPanel>
    );
}
