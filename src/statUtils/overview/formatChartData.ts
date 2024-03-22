import { getDaysDifference } from './getDaysDiff';
import { DateAndAmount } from '../../generated/graphql';

export const formatChartData = (
    chartData: DateAndAmount[],
    startDate: Date,
    endDate: Date
) => {
    const daysDifference = getDaysDifference(startDate, endDate);

    if (daysDifference <= 14) {
        return chartData;
    } else {
        const groupedData = [];

        let step;
        if (daysDifference <= 14) {
            return chartData;
        } else if (daysDifference <= 30) {
            step = 2;
        } else if (daysDifference <= 90) {
            step = Math.ceil(daysDifference / 8);
        } else {
            step = Math.ceil(daysDifference / 30);
        }

        for (let i = 0; i < chartData.length; i += step) {
            const subset = chartData.slice(
                i,
                Math.min(i + step, chartData.length)
            );
            const aggregatedValue = subset.reduce((sum, item) => {
                const amount = item.amount != null ? item.amount : 0;
                return sum + amount;
            }, 0);

            groupedData.push({
                date: subset[0].date,
                amount: Math.round(aggregatedValue),
            });
        }

        return groupedData;
    }
};
