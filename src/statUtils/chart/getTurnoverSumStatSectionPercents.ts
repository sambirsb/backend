import { generateDateRangeAmountStats } from '../../scraperUtils';
import { getPercent } from '../../utils';
import { getIncomeSource } from './getIncomeSource';
import { MergedChartData } from '../../typesStat';
import {
    IncomeSource,
    StatSectionPercentsWithMax,
} from '../../generated/graphql';

interface TurnoverSumStatSectionPercents {
    totalEarnings: StatSectionPercentsWithMax;
    incomeSources: IncomeSource;
}

export const getTurnoverSumStatSectionPercents = (
    data: MergedChartData,
    startDate: string,
    endDate: string
): TurnoverSumStatSectionPercents => {
    const dateArray = generateDateRangeAmountStats(
        startDate,
        endDate,
        'amount'
    );

    let total = 0;
    let maxValue = 0;
    let percent = 0;

    let subscriptionsTotal = 0;
    let tipsTotal = 0;
    let postsTotal = 0;
    let messagesTotal = 0;
    let referralsTotal = 0;
    let streamsTotal = 0;

    dateArray.forEach((day) => {
        const dataForDate = data.chartAmountTotalAll.find(
            (d) => d.date.split('T')[0] === day.date
        );
        if (dataForDate) {
            day.amount = parseFloat(dataForDate.total.toFixed(2));
            total += dataForDate.total;
            if (dataForDate.total > maxValue) {
                maxValue = dataForDate.total;
            }
            subscriptionsTotal += dataForDate.subscribes;
            tipsTotal += dataForDate.tips;
            postsTotal += dataForDate.post;
            messagesTotal += dataForDate.chat_messages;
            referralsTotal += dataForDate.ref;
            streamsTotal += dataForDate.stream;
        }
    });

    const incomeSources = getIncomeSource({
        total,
        subscriptionsTotal,
        tipsTotal,
        postsTotal,
        messagesTotal,
        referralsTotal,
        streamsTotal,
    });

    const lastTotal = data.sum.filter((item) => item.name === 'total');

    if (lastTotal.length > 0) {
        const lastTotalUpdated = lastTotal[0].count - total;
        percent = getPercent(total, lastTotalUpdated);
    }

    return {
        totalEarnings: {
            chart: dateArray,
            totalAndPercent: {
                percent: Math.round(percent),
                total: Math.round(total),
            },
            maxValue: Math.round(maxValue),
        },
        incomeSources,
    };
};
