import { useDeal } from "../../../../contexts/Deal/Deal.Context";
import { useCarModels } from "../../../../contexts/CarModels/CarModels.Context";
import { CarModel } from "../../../../api/CarInventory.Client";
import { calculateFinalPrice } from "../../../../contexts/Deal/Deal.Sync";

export const useCarModelsSelector = () => {
    const deal = useDeal();
    const carModels = useCarModels();

    return {
        isLoading: carModels.isLoading,
        isDisabled: deal.isFinalized,
        availableItems: carModels.carModels,
        selectedItem: deal.carModel,
        handleSelect(item: CarModel) {
            deal.set.carModel(item)
            const finalPrice = calculateFinalPrice(item, deal.selectedInsurancePlans);

            if (!finalPrice) {
                deal.set.isValid(true);
            } else if (item && deal.downpayment > finalPrice) {
                deal.set.isValid(false);
            } else {
                deal.set.isValid(true);
            }
            deal.set.approvalStatus({ isApproved: false })
        },
        handleClick: carModels.reloadAvailableModels
    }
}