import { DetStatsResponse } from '../generated/graphql';

export const aggregateStatistics = (
    aggregatedStats: DetStatsResponse[],
    individualStats: DetStatsResponse[]
): DetStatsResponse[] => {
    if (aggregatedStats.length === 0) {
        return individualStats;
    }

    const aggregatedMap = new Map(
        aggregatedStats.map((stat) => [stat.date, stat])
    );

    individualStats.forEach((individual) => {
        const aggregated = aggregatedMap.get(individual.date);

        if (aggregated) {
            aggregated.totalRevenue =
                (aggregated.totalRevenue ?? 0) + (individual.totalRevenue ?? 0);
            aggregated.newSubs =
                (aggregated.newSubs ?? 0) + (individual.newSubs ?? 0);
            aggregated.newSubsRevenue =
                (aggregated.newSubsRevenue ?? 0) +
                (individual.newSubsRevenue ?? 0);
            aggregated.recSubsRevenue =
                (aggregated.recSubsRevenue ?? 0) +
                (individual.recSubsRevenue ?? 0);
            aggregated.tipsRevenue =
                (aggregated.tipsRevenue ?? 0) + (individual.tipsRevenue ?? 0);
            aggregated.messagesRevenue =
                (aggregated.messagesRevenue ?? 0) +
                (individual.messagesRevenue ?? 0);
            aggregated.textingRation =
                (aggregated.textingRation ?? 0) +
                (individual.textingRation ?? 0);
            aggregated.openChats =
                (aggregated.openChats ?? 0) + (individual.openChats ?? 0);
            aggregated.sellingChats =
                (aggregated.sellingChats ?? 0) + (individual.sellingChats ?? 0);
            aggregated.linkClicks =
                (aggregated.linkClicks ?? 0) + (individual.linkClicks ?? 0);
            aggregated.conversionRate =
                (aggregated.conversionRate ?? 0) +
                (individual.conversionRate ?? 0);
        } else {
            aggregatedMap.set(individual.date, individual);
        }
    });

    return Array.from(aggregatedMap.values());
};
