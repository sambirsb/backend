import { getDaysDifference } from '../overview/getDaysDiff';
import { ChartsByType } from '../../generated/graphql';

export const formatChartDataForOFStats = (
    charts: ChartsByType[],
    startDate: Date,
    endDate: Date
) => {
    const daysDifference = getDaysDifference(startDate, endDate);
    if (daysDifference <= 14) {
        return charts;
    }

    let step;
    if (daysDifference <= 30) {
        step = 2;
    } else if (daysDifference <= 90) {
        step = Math.ceil(daysDifference / 8);
    } else {
        step = 30;
    }

    const groupedData = [];

    for (let i = 0; i < charts.length; i += step) {
        const subset = charts.slice(i, i + step);
        const aggregatedObject = subset.reduce(
            (acc, item) => {
                acc.subscription += item.subscription;
                acc.tips += item.tips;
                acc.posts += item.posts;
                acc.referrals += item.referrals;
                acc.messages += item.messages;
                acc.streams += item.streams;
                return acc;
            },
            {
                date: subset[0].date,
                subscription: 0,
                tips: 0,
                posts: 0,
                referrals: 0,
                messages: 0,
                streams: 0,
            }
        );

        groupedData.push(aggregatedObject);
    }

    return groupedData;
};
