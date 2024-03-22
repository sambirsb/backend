import { generateDateRangeAmountStats } from '../../scraperUtils';
import { getPercent } from '../../utils';
import { SubsWithExpired } from '../../typesStat';
import {
    DateNewExpired,
    StatisticFollowersWithPercent,
} from '../../generated/graphql';

export const getSubsWithExpiredStatSectionPercents = (
    data: SubsWithExpired,
    startDate: string,
    endDate: string
): StatisticFollowersWithPercent => {
    const dateRangeStats = generateDateRangeAmountStats(
        startDate,
        endDate,
        'new'
    );

    const chart: DateNewExpired[] = dateRangeStats.map((day) => ({
        date: day.date,
        new: 0,
        expired: 0,
    }));

    data.actual.forEach((sub) => {
        const subDate = sub.startDate.toISOString().split('T')[0];
        const chartItem = chart.find((item) => item.date === subDate);
        if (chartItem) {
            chartItem.new += 1;
        }
    });

    data.expired.forEach((sub) => {
        const expDate = sub.expiredAt.toISOString().split('T')[0];
        const chartItem = chart.find((item) => item.date === expDate);
        if (chartItem) {
            chartItem.expired += 1;
        }
    });

    const totalAll = data.actual.length;
    const totalNew = chart.reduce((acc, cur) => acc + cur.new, 0);
    const totalOld = totalAll - totalNew;
    const maxValue = Math.max(...chart.map((item) => item.new + item.expired));

    return {
        chart,
        totalAndPercent: {
            total: totalNew,
            percent: Math.round(getPercent(totalNew, totalOld)),
        },
        maxValue,
    };
};
