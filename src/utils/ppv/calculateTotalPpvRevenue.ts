import {
    PpvTrackingStatistic,
    PpvTrackingVaultResponse,
} from '../../generated/graphql';

export const calculateTotalPpvRevenue = (
    revenueData: PpvTrackingVaultResponse[],
    statistic: PpvTrackingStatistic[]
) => {
    let totalRevenue = 0;
    let sumPurchases = 0;
    let quantityPurchases = 0;
    let totalPurchaseRate = 0;

    revenueData.forEach((stat) => {
        totalRevenue += stat.revenue || 0;
        sumPurchases += stat.purchases || 0;

        if (stat.purchases && stat.purchases > 0) {
            quantityPurchases += 1;
            totalPurchaseRate += stat.purchaseRate || 0;
        }
    });

    const averagePurchaseRate =
        quantityPurchases > 0
            ? Math.round(totalPurchaseRate / quantityPurchases)
            : 0;

    return {
        revenue: totalRevenue,
        purchaseRate: averagePurchaseRate,
        purchases: sumPurchases,
        statistic,
    };
};
