import { initChartData } from './initChartData';
import { updateSumMap } from './updateSumMap';
import {
    ChartAmountAll,
    ChartAmountTotalAll,
    ChartResponse,
    MergedChartData,
    TotalChartType,
} from '../../typesStat/ChartDatesAmount';
import { OFChartAmount } from '../../typesStat/fromOF/OFLibTypes';

export const mergeChartData = (
    chartDAFromDB: ChartAmountAll[],
    chartDAFromAPI: ChartResponse
): MergedChartData => {
    const responseMap = new Map<string, ChartAmountTotalAll>();
    const sumMap = new Map<string, number>();

    chartDAFromDB.forEach((item: ChartAmountAll) => {
        const total = Object.values(item).reduce(
            (acc, val) => (typeof val === 'number' ? acc + val : acc),
            0
        );
        responseMap.set(item.date, { ...item, total });

        updateSumMap(sumMap, item);
    });

    Object.entries(chartDAFromAPI).forEach(([key, value]) => {
        value.chartAmount.forEach((chartAmount: OFChartAmount) => {
            let existingData = responseMap.get(chartAmount.date);
            if (!existingData) {
                existingData = initChartData(chartAmount.date);
                responseMap.set(chartAmount.date, existingData);
            }

            switch (key) {
                case 'subscribes':
                    existingData.subscribes += chartAmount.count;
                    break;
                case 'tips':
                    existingData.tips += chartAmount.count;
                    break;
                case 'post':
                    existingData.post += chartAmount.count;
                    break;
                case 'chat_messages':
                    existingData.chat_messages += chartAmount.count;
                    break;
            }

            existingData.total =
                existingData.subscribes +
                existingData.tips +
                existingData.post +
                existingData.chat_messages +
                existingData.ref +
                existingData.stream;

            updateSumMap(sumMap, { [key]: chartAmount.count });
        });
    });

    if (sumMap.size > 0) {
        const totalFromCategories = Array.from(sumMap.values()).reduce(
            (acc, val) => acc + val,
            0
        );
        sumMap.set('total', totalFromCategories);
    }

    const chartAmountTotalAll: ChartAmountTotalAll[] = Array.from(
        responseMap.values()
    );
    const sum: TotalChartType[] = Array.from(sumMap, ([name, count]) => ({
        name,
        count,
    }));

    return {
        chartAmountTotalAll,
        sum,
    };
};
