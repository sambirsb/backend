import { formatDate } from '../../utils';
import {
    GetSubsResponse,
    OFSubscriptionLatestResponseData,
} from '../../typesStat';
import { DateAndCount, StatisticSection } from '../../generated/graphql';

export const mergeSubsData = (
    subs: GetSubsResponse,
    subscriptionLatestData: OFSubscriptionLatestResponseData
): StatisticSection => {
    const newSubsCountByDate: Record<string, number> = {};

    subs.transactions.forEach((transaction) => {
        const date = formatDate(transaction.startDate.toString());
        newSubsCountByDate[date] = (newSubsCountByDate[date] || 0) + 1;
    });

    subscriptionLatestData.users.forEach((user) => {
        if (user.subscribedOnData && user.subscribedOnData.subscribeAt) {
            const date = user.subscribedOnData.subscribeAt.split('T')[0];
            newSubsCountByDate[date] = (newSubsCountByDate[date] || 0) + 1;
        }
    });

    const chart: DateAndCount[] = Object.entries(newSubsCountByDate).map(
        ([date, count]) => ({
            date,
            count,
        })
    );

    const total = chart.reduce((acc, { count }) => acc + count, 0);

    return { chart, total };
};
