import { useState, useEffect } from "react";
import { financingClient } from "../../../../api/Financing.Client";
import { useDeal } from "../../../../contexts/Deal/Deal.Context";
import { calculateFinalPrice } from "../../../../contexts/Deal/Deal.Sync";

export const useDownPayment = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('0');
    const [message, setMessage] = useState<string>('');

    const deal = useDeal();

    const setMinimumPossibleDownpayment = async (): Promise<void> => {
        if (!deal.carModel) {
            return;
        }
        setIsLoading(true);
        deal.set.isLoading(true);
        try {
            const result = await financingClient.getMinimumPossibleDownpayment(
                deal.carModel,
                deal.selectedInsurancePlans.map(plan => plan.type)
            );
            setValue(result.toString());
            deal.set.downpayment(result);
        } finally {
            setIsLoading(false);
            deal.set.isLoading(false);
        }
    }

    const passesFinalPriceCheck = (value?: number): boolean => {
        const finalPrice = calculateFinalPrice(deal.carModel, deal.selectedInsurancePlans);
        const downpayment = value ?? deal.downpayment;
        if (!finalPrice) {
            setMessage('');
            return true;
        }

        if (deal.carModel && downpayment > finalPrice) {
            setMessage('Downpayment exceeds final price');
            return false;
        }
        setMessage('');
        return true;
    }

    useEffect(() => {
        passesFinalPriceCheck();
    }, [deal.carModel, deal.selectedInsurancePlans])

    const setValueFromStore = () => {
        const nextValue = deal.downpayment.toString();
        setValue(nextValue);
        setMessage('');
        deal.set.isValid(true);
    }

    useEffect(() => {
        setValueFromStore();
    }, []);

    return {
        isDisabled: isLoading || !deal.carModel || deal.isFinalized,
        isValid: deal.isValid,
        displayedValue: value,
        message,
        handleClick: async () => {
            await setMinimumPossibleDownpayment();
            deal.set.isValid(true);
            setMessage('');
            deal.set.approvalStatus({ isApproved: false });
        },
        handleChange(event: React.ChangeEvent<HTMLInputElement>) {
            setValue(event.target.value);
        },
        handleBlur(_event: React.ChangeEvent<HTMLInputElement>) {
            if (value === '') {
                deal.set.downpayment(0);
                deal.set.approvalStatus({ isApproved: false });
                return;
            }


            const transformedValue: string = value.trim()
                .replace('k', '000')
                .replace('K', '000')
                .replace('m', '000000')
                .replace('M', '000000');

            if (transformedValue[0] === '-') {
                deal.set.isValid(false);
                deal.set.approvalStatus({ isApproved: false });
                setMessage('Value must be 0 or positive');
                return;
            }

            const isInteger = /^\d+$/.test(transformedValue) === true;
            if (!isInteger) {
                deal.set.isValid(false);
                deal.set.approvalStatus({ isApproved: false });
                setMessage('Please enter a valid integer');
                return;
            }

            const parsedInteger = parseInt(transformedValue);
            setValue(parsedInteger.toString());
            deal.set.downpayment(parsedInteger);
            if (!passesFinalPriceCheck(parsedInteger)) {
                deal.set.isValid(false);
            } else {
                deal.set.isValid(true);
            };
            deal.set.approvalStatus({ isApproved: false });
        }
    }
}