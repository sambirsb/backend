import { StatisticSection, DateAndCount } from '../../generated/graphql';

export const aggregateNewSubsData = (allNewSubs: any[]): StatisticSection => {
    const totalNewSubs: StatisticSection = {
        chart: [],
        total: 0,
    };

    const dateCounts: Record<string, number> = {};

    allNewSubs.forEach(({ subsLatestRespData }) => {
        subsLatestRespData.chart.forEach((data: DateAndCount) => {
            if (dateCounts[data.date]) {
                dateCounts[data.date] += data.count;
            } else {
                dateCounts[data.date] = data.count;
            }
        });
        totalNewSubs.total += subsLatestRespData.total;
    });

    totalNewSubs.chart = Object.entries(dateCounts).map(([date, count]) => ({
        date,
        count,
    }));

    totalNewSubs.chart.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return totalNewSubs;
};
