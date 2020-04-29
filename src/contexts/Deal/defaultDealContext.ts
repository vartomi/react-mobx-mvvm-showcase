import { IDealContext } from "./Deal.Context";
import { CarModel } from "../../api/CarInventory.Client";
import {  InsurancePlan } from "../../api/CarInsurance.Client";
import { ApprovalStatus } from "./Deal.Types";

export const defaultDealContext: IDealContext = {
    id: 0,
    setCarModel: (value: CarModel) => {
        throw new Error('You forget to add a provider')
    },
    selectedInsurancePlans: [],
    setSelectedInsurancePlans: (value:  InsurancePlan[]) => {
        throw new Error('You forget to add a provider')
    },
    downpayment: 0,
    setDownpayment: (value: number) => {
        throw new Error('You forget to add a provider')
    },
    isLoading: false,
    setIsLoading: (value: boolean) => {
        throw new Error('You forget to add a provider')
    },
    isValid: false,
    setIsValid: (value: boolean) => {
        throw new Error('You forget to add a provider')
    },
    isFinalized: false,
    setIsFinalized: (value: boolean) => {
        throw new Error('You forget to add a provider')
    },
    messages: [],
    setMessages: (value: string[]) => {
        throw new Error('You forget to add a provider')
    },
    approvalStatus: {
        isApproved: false
    },
    setApprovalStatus: (value: ApprovalStatus) => {
        throw new Error('You forget to add a provider')
    },
    handleCloseDealClick: (id: number) => {
        throw new Error('You forget to add a provider')
    }
}