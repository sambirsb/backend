import { DetStatsResponse } from '../generated/graphql';

export const calculateDetStats = (
    data: DetStatsResponse[]
): DetStatsResponse[] => {
    return data.map((stat) => {
        const conversionRate =
            stat.linkClicks && stat.newSubs
                ? parseFloat((stat.linkClicks / stat.newSubs).toFixed(2))
                : 0;

        const totalRevenueFromMessages =
            (stat.tipsRevenue ?? 0) + (stat.messagesRevenue ?? 0);
        const textingRation =
            stat.newSubsRevenue ?? 0
                ? parseFloat(
                      (
                          totalRevenueFromMessages / (stat.newSubsRevenue ?? 0)
                      ).toFixed(2)
                  )
                : 0;

        return {
            ...stat,
            conversionRate: conversionRate,
            textingRation: textingRation,
        };
    });
};
