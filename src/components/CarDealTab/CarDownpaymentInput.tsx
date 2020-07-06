import React from 'react';

type CarDownpaymentInputProps = {
    minimumDownpayment: number,
    value: number | null,
    onChange: (downpayment: number) => void
}

export const CarDownpaymentInput: React.FC<CarDownpaymentInputProps> = ({ minimumDownpayment, value, onChange }) => {
    return (
        <div>
            <>
                <div className='car-deal-tab-property-label'>Please select downpayment</div>
                <div className='car-deal-tab-property-input'>
                    <input
                        value={value || ''}
                        disabled={!value && !minimumDownpayment}
                        onChange={({ target: { value } }) => onChange(parseInt(value))} />
                </div>
                <button className='car-deal-tab-property-button' onClick={() => onChange(minimumDownpayment)}>Set minimum possible</button>
            </>
        </div>
    );
}