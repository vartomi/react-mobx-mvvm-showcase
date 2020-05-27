import React, { useEffect, useState } from 'react';
import { CarModel } from '../../api/CarInventory.Client';
import { useSelector, useDispatch } from 'react-redux';
import { iRootState, Dispatch } from '../../store';

type CarDownpaymentInputProps = {
    minimumDownpayment: number,
    value: number | null
}

export const CarDownpaymentInput: React.FC<CarDownpaymentInputProps> = ({ minimumDownpayment, value }) => {
    return (
        <div>
            <>
                <div className='car-deal-tab-property-label'>Please select downpayment</div>
                <div className='car-deal-tab-property-input'>
                    <input value={value || minimumDownpayment || ''} />
                </div>
                <button className='car-deal-tab-property-button' >Set minimum possible</button>
            </>
        </div>
    );
}