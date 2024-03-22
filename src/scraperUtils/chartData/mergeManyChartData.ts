import { MergedChartData } from '../../typesStat/ChartDatesAmount';

export const mergeManyChartData = (
    allChartData: MergedChartData[]
): MergedChartData => {
    const mergedData: MergedChartData = {
        chartAmountTotalAll: [],
        sum: [],
    };

    allChartData.forEach((chartData) => {
        chartData.chartAmountTotalAll.forEach((item) => {
            const existingItem = mergedData.chartAmountTotalAll.find(
                (x) => x.date === item.date
            );
            if (existingItem) {
                existingItem.subscribes += item.subscribes;
                existingItem.tips += item.tips;
                existingItem.post += item.post;
                existingItem.chat_messages += item.chat_messages;
                existingItem.ref += item.ref;
                existingItem.stream += item.stream;

                existingItem.total =
                    existingItem.subscribes +
                    existingItem.tips +
                    existingItem.post +
                    existingItem.chat_messages +
                    existingItem.ref +
                    existingItem.stream;
            } else {
                mergedData.chartAmountTotalAll.push({ ...item });
            }
        });

        chartData.sum.forEach((sumItem) => {
            const existingSum = mergedData.sum.find(
                (x) => x.name === sumItem.name
            );
            if (existingSum) {
                existingSum.count += sumItem.count;
            } else {
                mergedData.sum.push({ ...sumItem });
            }
        });
    });

    return mergedData;
};
