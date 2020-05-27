import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { iRootState, Dispatch } from '../../store';
import { InsurancePlan } from '../../api/CarInsurance.Client';

type CarInsuranceInputProps = {
    selectedInsurances: InsurancePlan[]
    onSelect: (selectedInsurances: InsurancePlan[]) => void
}

export const CarInsuranceInput: React.FC<CarInsuranceInputProps> = ({ selectedInsurances, onSelect }) => {
    const availableInsurances: InsurancePlan[] = useSelector((state: iRootState) => state.carInsurance.availableInsurances);
    const { carInsurance: { loadAvailableInsurances } }: Dispatch = useDispatch();

    useEffect(() => {
        loadAvailableInsurances();
    }, []);

    const setSelectedInsurances = ({ target: { options } }: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(options).filter(option => option.selected).map(option => +option.value);
        const selectedInsurances = availableInsurances.filter(insurance => selectedOptions.includes(insurance.id));
        onSelect(selectedInsurances);
    };

    return (
        <div>
            <>
                <div className='car-deal-tab-property-label'>Please select insurance options</div>
                <div className='car-deal-tab-property-input'>
                    {availableInsurances.length > 0 ? (
                        <select
                            name="choice"
                            multiple
                            onChange={setSelectedInsurances}>
                            {availableInsurances.map(insurance =>
                                <option key={`insurance-${insurance.id}`}
                                    value={insurance.id}
                                    selected={selectedInsurances.some(selectedInsurance => insurance.id === selectedInsurance.id)}
                                >{insurance.description}</option>
                            )}
                        </select>
                    ) : 'loading...'}
                </div>
                <button className='car-deal-tab-property-button' onClick={loadAvailableInsurances}>Refersh available plans</button>
            </>
        </div>
    );
}