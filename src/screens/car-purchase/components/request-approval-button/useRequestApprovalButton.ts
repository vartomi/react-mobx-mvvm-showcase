import { useDeal } from "../../../../contexts/Deal/Deal.Context";
import { useEffect, useState } from "react";
import { canRequestApproval } from "../../../../contexts/Deal/Deal.Sync";
import { financingClient } from "../../../../api/Financing.Client";

export const useRequestApprovalButton = () => {

    const [isRequestApprovalButtonDisabled, setIsRequestApprovalButtonDisabled] = useState<boolean>(false);

    const deal = useDeal();

    useEffect(() => {
        const nextValue: boolean = !canRequestApproval(deal.isLoading, deal.carModel, deal.isFinalized, deal.approvalStatus, deal.isValid);
        setIsRequestApprovalButtonDisabled(nextValue);

    }, [deal.isLoading, deal.carModel, deal.isFinalized, deal.approvalStatus, deal.isValid]);

    return {
        handleRequestApprovalClick: async () => {
            if (!deal.carModel) {
                return;
            }
            deal.set.isLoading(true);
            try {
                const result = await financingClient.getApproval(
                    deal.carModel,
                    deal.selectedInsurancePlans.map(plan => plan.type),
                    deal.downpayment
                );

                if (result.isApproved && !result.expiration) {
                    deal.set.approvalStatus({
                        isApproved: true,
                        approvalToken: result.approvalToken
                    })
                    deal.set.messages([]);
                    return;
                }

                if (result.isApproved && !!result.expiration) {
                    deal.set.approvalStatus({
                        isApproved: true,
                        expiration: result.expiration,
                        isExpired: false,
                        approvalToken: result.approvalToken,
                    })
                    deal.set.messages([]);
                }

                if (!result.isApproved) {
                    deal.set.approvalStatus({
                        isApproved: false
                    });
                    deal.set.messages([result.message]);
                }


            } finally {
                deal.set.isLoading(false)
            }

        },
        isRequestApprovalButtonDisabled,
    }
}