import { getPercent, isWithinPeriod } from '../../utils';
import { generateDateRangeAmountStats } from '../../scraperUtils';
import { TransactionWithUser } from '../../typesStat';
import {
    DateAndAmount,
    StatSectionPercentsWithMax,
} from '../../generated/graphql';

export const getTransStatSectionPercents = (
    data: TransactionWithUser[],
    startDate: string,
    endDate: string
): StatSectionPercentsWithMax => {
    const filteredTransactions = data.filter((transaction) =>
        isWithinPeriod(
            new Date(transaction.transactionDate),
            new Date(startDate),
            new Date(endDate)
        )
    );

    const countsLastTrans = data.length - filteredTransactions.length;
    const countsActualTrans = filteredTransactions.length;
    const percent = getPercent(countsActualTrans, countsLastTrans);

    const dateRangeStats = generateDateRangeAmountStats(
        startDate,
        endDate,
        'amount'
    );
    const chart: DateAndAmount[] = dateRangeStats.map((day) => ({
        date: day.date,
        amount: 0,
    }));

    chart.forEach((chartItem) => {
        const transactionsForDate = filteredTransactions.filter(
            (transaction) => {
                const transactionDate =
                    transaction.transactionDate.split('T')[0];
                return transactionDate === chartItem.date;
            }
        );

        chartItem.amount = transactionsForDate.length;
    });

    const maxAmount = Math.max(...chart.map((item) => item.amount || 0));

    return {
        chart,
        totalAndPercent: {
            percent: Math.round(percent),
            total: countsActualTrans,
        },
        maxValue: maxAmount,
    };
};
