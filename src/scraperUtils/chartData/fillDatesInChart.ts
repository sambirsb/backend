import { StatisticSection, DateAndCount } from '../../generated/graphql';

export const fillDatesInChart = (
    chart: DateAndCount[],
    startDate: string,
    endDate: string
): StatisticSection => {
    const newChart: DateAndCount[] = [];
    const existingCounts: Record<string, number> = {};
    chart.forEach(({ date, count }) => {
        existingCounts[date] = count;
    });

    const start = new Date(startDate);
    const end = new Date(endDate);
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        newChart.push({
            date: dateStr,
            count: existingCounts[dateStr] || 0,
        });
    }

    const total = newChart.reduce((acc, { count }) => acc + count, 0);

    return {
        chart: newChart,
        total,
    };
};
