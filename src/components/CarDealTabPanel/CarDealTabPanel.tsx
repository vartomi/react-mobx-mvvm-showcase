import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { iRootState, Dispatch } from '../../store';
import { CarDeal, mapDealToTabHeader } from '../../store/models/CarDeal';
import { TabPanel } from '../TabPanel/TabPanel';
import { CarDealTab } from '../CarDealTab/CarDealTab';

export const CarDealTabPanel: React.FC = () => {
    const [selectedTab, setSelectedTab]: [string, any] = useState('');
    const carDeals: CarDeal[] = useSelector((state: iRootState) => state.carDeal.deals);
    const { carDeal: { createNewDealForeign, createNewDealCh, removeDeal } }: Dispatch = useDispatch();

    useEffect(() => {
        if (carDeals.length < 1) return;
        if (!selectedTab || !carDeals.map(deal => deal.id).includes(selectedTab)) {
            setSelectedTab(carDeals[0].id);
        }
    }, [carDeals, selectedTab])

    return (
        <TabPanel>
            <TabPanel.Header
                tabs={carDeals.map(mapDealToTabHeader)}
                activeTab={selectedTab}
                setSelectedTab={setSelectedTab}
                buttons={[
                    {
                        title: 'Add deal',
                        callback: createNewDealCh
                    },
                    {
                        title: 'Add foreign currency deal',
                        callback: createNewDealForeign
                    }
                ]}
                onCloseTab={removeDeal}/>
            <TabPanel.Body>
                {carDeals
                    .filter((carDeal: CarDeal) => carDeal.id === selectedTab)
                    .map((carDeal: CarDeal, index) => <CarDealTab key={`car-deal-${index}`} deal={carDeal} />)}
            </TabPanel.Body>
        </TabPanel>
    );
}
