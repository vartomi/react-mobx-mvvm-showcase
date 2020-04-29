import { useInsurancePlans } from "../../../../contexts/InsurancePlans/InsurancePlans.Context";
import { useDeal } from "../../../../contexts/Deal/Deal.Context";
import { InsurancePlan } from "../../../../api/CarInsurance.Client";
import { calculateFinalPrice } from "../../../../contexts/Deal/Deal.Sync";

export const useInsurancePlanSelector = () => {
    const plans = useInsurancePlans();
    const deal = useDeal();

    return {
        isLoading: plans.isLoading,
        availableItems: plans.insurancePlans,
        selectedItems: deal.selectedInsurancePlans,
        isDisabled: deal.isFinalized,
        handleSelect(items: InsurancePlan[]) {
            deal.set.selectedInsurancePlans(items)
            deal.set.approvalStatus({ isApproved: false })
            const finalPrice = calculateFinalPrice(deal.carModel, items);

            if (!finalPrice) {
                deal.set.isValid(true);
            } else if (deal.carModel && deal.downpayment > finalPrice) {
                deal.set.isValid(false);
            } else {
                deal.set.isValid(true);
            }
        },
        handleClick: plans.reloadAvailableInsurancePlans
    }
}