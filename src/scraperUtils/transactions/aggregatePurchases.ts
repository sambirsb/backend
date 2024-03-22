import { DateAndCount, StatisticSection } from '../../generated/graphql';

export const aggregatePurchases = (
    purchases: StatisticSection[]
): StatisticSection => {
    const dateCountMap: { [key: string]: number } = {};
    let aggregatedTotal = 0;

    purchases.forEach((purchase) => {
        aggregatedTotal += purchase.total;

        purchase.chart.forEach((dateAndCount) => {
            const dateStr = dateAndCount.date.toISOString().split('T')[0];
            if (!dateCountMap[dateStr]) {
                dateCountMap[dateStr] = 0;
            }
            dateCountMap[dateStr] += dateAndCount.count;
        });
    });

    const aggregatedChart: DateAndCount[] = Object.keys(dateCountMap).map(
        (dateStr) => ({
            date: new Date(dateStr),
            count: dateCountMap[dateStr],
        })
    );

    return { chart: aggregatedChart, total: aggregatedTotal };
};
