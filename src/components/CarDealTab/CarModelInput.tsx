import React, { useEffect, useState } from 'react';
import { CarModel } from '../../api/CarInventory.Client';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '../../store';
import { SelectedCarModel } from '../../store/models/CarDeal';

type CarModelInputProps = {
    selectedModel: SelectedCarModel,
    onSelect: (selectedModel: SelectedCarModel) => void,
}

export const CarModelInput: React.FC<CarModelInputProps> = ({ selectedModel, onSelect }) => {
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
                        <select name="choice"
                            value={selectedModel?.id || 'none'}
                            onChange={({ target: { value } }) => onSelect(availableModels.find(model => model.id === +value) || null)
                            }>
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