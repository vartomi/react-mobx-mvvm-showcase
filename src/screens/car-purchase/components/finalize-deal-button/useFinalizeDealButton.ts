import { useDeal } from "../../../../contexts/Deal/Deal.Context";
import { financingClient } from "../../../../api/Financing.Client";
import { useEffect, useState } from "react";
import { canFinalizeDeal } from "../../../../contexts/Deal/Deal.Sync";

export const useFinalizeDealButton = () => {
    const [isFinalizeDealButtonDisabled, setIsFinalizeDealButtonDisabled] = useState<boolean>(true);
    const deal = useDeal();

    useEffect(() => {

        const nextValue = !canFinalizeDeal(deal.isLoading, deal.isFinalized, deal.approvalStatus.isApproved, deal.approvalStatus.isExpired);
        setIsFinalizeDealButtonDisabled(nextValue);
    }, [deal.isLoading, deal.approvalStatus.isApproved, deal.isFinalized, deal.approvalStatus.isExpired]);

    return {
        handleFinalizeDealClick: async () => {
            if (!deal.approvalStatus.approvalToken) {
                return;
            }

            deal.set.isLoading(true);
            deal.set.messages([]);

            try {
                const result = await financingClient.finalizeFinancing(
                    deal.approvalStatus.approvalToken,
                    true
                );

                if (!result) {
                    deal.set.messages(['Deal finalization failed.']);
                    return;
                }
                deal.set.isFinalized(true);
            }
            finally {
                deal.set.isLoading(false);
            }
        },
        isFinalizeDealButtonDisabled
    }
}