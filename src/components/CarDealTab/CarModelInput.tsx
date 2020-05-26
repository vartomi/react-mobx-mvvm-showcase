import React, { useEffect, useState } from 'react';
import { CarModel } from '../../api/CarInventory.Client';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '../../store';

type CarModelInputProps = {
    selectedModelId: number | null,
    onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export const CarModelInput: React.FC<CarModelInputProps> = ({ selectedModelId, onSelect }) => {
    const availableModels: CarModel[] = useSelector((state: iRootState) => state.carInventory.availableModels);
    const { carInventory: { loadAvailableModels } }: Dispatch = useDispatch();

    useEffect(() => {
        loadAvailableModels();
    }, []);

    return (
        <div>
            <>
                <div className='car-deal-tab-property-label'>Please select model</div>
                <div className='car-deal-tab-property-input'>
                    {availableModels.length > 0 ? (
                        <select name="choice" value={selectedModelId || 'none'} onChange={onSelect}>
                            <option value="none" disabled>None</option>
                            {availableModels.map(model => <option key={`model-${model.id}`} value={model.id}>{model.description}</option>)}
                        </select>
                    ) : 'loading...'}
                </div>
                <button className='car-deal-tab-property-button' onClick={loadAvailableModels}>Refersh available models</button>
            </>
        </div>
    );
};