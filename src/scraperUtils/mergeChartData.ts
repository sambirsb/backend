import { ChartType } from '../constants/ChartType';
import {
    ChartAmountAll,
    ChartAmountTotalAll,
    ChartResponse,
    MergedChartData,
    TotalChartType,
} from '../typesStat/ChartDatesAmount';

export const mergeChartData = (
    chartDAFromDB: ChartAmountAll[],
    chartDAFromAPI: ChartResponse
): MergedChartData => {
    const mergedData: Record<string, ChartAmountTotalAll> = {};
    const sum: TotalChartType[] = Object.values(ChartType).map((type) => ({
        name: type,
        count: 0,
    }));

    chartDAFromDB.forEach((item) => {
        if (!mergedData[item.date]) {
            mergedData[item.date] = { ...item, total: 0 };
        }

        sum.forEach((s) => {
            const value = item[s.name as keyof ChartAmountAll];
            if (typeof value === 'number') {
                s.count += value;
            }
        });
    });

    Object.values(ChartType).forEach((type) => {
        chartDAFromAPI[type]?.chartAmount.forEach((item) => {
            if (!mergedData[item.date]) {
                mergedData[item.date] = {
                    date: item.date,
                    subscribes: 0,
                    tips: 0,
                    post: 0,
                    chat_messages: 0,
                    ref: 0,
                    stream: 0,
                    total: 0,
                };
            }
            const count = item.count;
            if (typeof count === 'number') {
                mergedData[item.date][type] += count;

                const sumItem = sum.find((s) => s.name === type);
                if (sumItem) {
                    sumItem.count += count;
                }
            }
        });
    });

    const chartAmountTotalAll: ChartAmountTotalAll[] =
        Object.values(mergedData);
    chartAmountTotalAll.forEach((item) => {
        item.total = Object.values(ChartType).reduce((acc, type) => {
            const value = item[type as keyof ChartAmountTotalAll];
            if (typeof value === 'number') {
                return acc + value;
            }
            return acc;
        }, 0);
    });

    const sumWithoutTotal = sum.filter((item) => item.name !== ChartType.TOTAL);

    return {
        chartAmountTotalAll,
        sum: sumWithoutTotal,
    };
};
