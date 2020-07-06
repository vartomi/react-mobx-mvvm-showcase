import React from 'react';
import { Currency } from '../store/models/CarDealForeign';

type CurrencyInputProps = {
    selectedCurrency: Currency,
    onSelect: (currency: Currency) => void,
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ selectedCurrency, onSelect }) => {
    const availableCurrencies = [
        {id: Currency.EUR, value: 'EUR'},
        {id: Currency.USD, value: 'USD'}
    ]
    return (
        <div>
            <>
                <div className='car-deal-tab-property-label'>Please select currency</div>
                <div className='car-deal-tab-property-input'>
                    <select name="choice"
                        value={selectedCurrency || Currency.EUR}
                        onChange={({ target: { value } }) => onSelect(availableCurrencies.find(curr => curr.id === value)?.id || Currency.EUR)
                        }>
                        {availableCurrencies.map(currency => <option key={`model-currency-${currency.id}`} value={currency.id}>{currency.value}</option>)}
                    </select>
                </div>
            </>
        </div>
    );
};