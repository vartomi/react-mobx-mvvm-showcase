import React, { useEffect, useState } from 'react';
import { CarModel } from '../../api/CarInventory.Client';
import { useSelector, useDispatch } from 'react-redux';
import { iRootState, Dispatch } from '../../store';

export const CarInsuranceInput: React.FC = () => {
    const availableInsurances: CarModel[] = useSelector((state: iRootState) => state.carInsurance.availableInsurances);
    const { carInsurance: { loadAvailableInsurances } }: Dispatch = useDispatch();

    useEffect(() => {
        loadAvailableInsurances();
    }, []);

    return (
        <div>
            <>
                <div className='car-deal-tab-property-label'>Please select insurance options</div>
                <div className='car-deal-tab-property-input'>
                    {availableInsurances.length > 0 ? (
                        <select name="choice" multiple>
                            {availableInsurances.map(insurance => <option key={`insurance-${insurance.id}`} value={insurance.id}>{insurance.description}</option>)}
                        </select>
                    ) : 'loading...'}
                </div>
                <button className='car-deal-tab-property-button' onClick={loadAvailableInsurances}>Refersh available plans</button>
            </>
        </div>
    );
}