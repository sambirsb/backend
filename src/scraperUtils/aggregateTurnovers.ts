import { DateAndCount, StatisticSection } from '../generated/graphql';

export const aggregateTurnovers = (
    allTurnovers: StatisticSection[]
): StatisticSection => {
    const totalTurnover: StatisticSection = {
        chart: [],
        total: 0,
    };

    allTurnovers.forEach((turnover) => {
        totalTurnover.total += turnover.total;

        if (!turnover.chart) {
            return;
        }

        turnover.chart.forEach((dateAndCount: DateAndCount) => {
            const existingEntry = totalTurnover.chart.find(
                (entry) => entry.date === dateAndCount.date
            );
            if (existingEntry) {
                existingEntry.count += dateAndCount.count;
            } else {
                totalTurnover.chart.push({ ...dateAndCount });
            }
        });
    });

    return totalTurnover;
};
