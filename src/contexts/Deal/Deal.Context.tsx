import React, { createContext, useContext } from 'react';
import { CarModel } from '../../api/CarInventory.Client';
import { InsurancePlan } from '../../api/CarInsurance.Client';
import { ApprovalStatus } from './Deal.Types';
import { useReducerTyped, def, undef, throwNoProvider, defaultContextFactory } from '../../util/contexts';

const reducerHookDefaults = {
    downpayment: 0,
    carModel: undef<CarModel>(),
    selectedInsurancePlans: def<InsurancePlan[]>([]),
    isLoading: false,
    isValid: false,
    isFinalized: false,
    messages: def<string[]>([]),
    approvalStatus: { isApproved: false } as ApprovalStatus
};

const additionState = {
    id: 0,
    handleCloseDealClick: (id: number) => throwNoProvider()
}

const defaultContext = defaultContextFactory(reducerHookDefaults, additionState);

export const DealContext = createContext(defaultContext);

interface IDealContextProps {
    children: React.ReactNode;
    initialDealId: number;
    handleCloseDealClick: (id: number) => void;
}

export const DealProvider: React.FC<IDealContextProps> = (props) => {

    const reducerTypedHook = useReducerTyped(reducerHookDefaults);

    return <DealContext.Provider
        value={{
            ...reducerTypedHook,
            id: props.initialDealId,
            handleCloseDealClick: props.handleCloseDealClick,
        }}
    >
        {props.children}
    </DealContext.Provider>
}

export const useDeal = () => useContext(DealContext);