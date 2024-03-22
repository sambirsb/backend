import { getDaysDifference } from './getDaysDiff';
import { DateNewExpired } from '../../generated/graphql';

export const aggregateFollowersChartData = (
    chartData: DateNewExpired[],
    startDate: Date,
    endDate: Date
) => {
    const dayCount = getDaysDifference(startDate, endDate);
    let interval = 1;

    if (dayCount > 14 && dayCount <= 30) {
        interval = 2;
    } else if (dayCount > 30 && dayCount <= 90) {
        interval = Math.ceil(dayCount / 8);
    } else if (dayCount > 90) {
        interval = Math.ceil(dayCount / 30);
    }

    const aggregatedData = [];

    for (let i = 0; i < chartData.length; i += interval) {
        const chunk = chartData.slice(i, i + interval);
        const aggregatedChunk = chunk.reduce(
            (acc, dayData) => {
                acc.new += dayData.new;
                acc.expired += dayData.expired;
                return acc;
            },
            { new: 0, expired: 0, date: chunk[0].date }
        );

        aggregatedData.push(aggregatedChunk);
    }

    return aggregatedData;
};
