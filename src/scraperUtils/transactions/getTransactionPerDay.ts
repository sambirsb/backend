import { generateDateRangeAmountStats } from '../forScraping/generateDateRangeAmountStats';
import { calculateTransactions } from './calculateTransactions';
import { TransactionWithUser } from '../../typesStat/TransactionTypes';
import { DateAndCount, StatisticSection } from '../../generated/graphql';

export const getTransactionPerDay = (
    startDate: string,
    endDate: string,
    transactions: TransactionWithUser[]
): StatisticSection => {
    const dateArray = generateDateRangeAmountStats(startDate, endDate, 'count');
    const transactionsPerDay = calculateTransactions(transactions);

    const chart: DateAndCount[] = dateArray.map((dateObj) => {
        const date = dateObj.date;
        const found = transactionsPerDay.chart.find(
            (d) => d.date.toISOString().split('T')[0] === date
        );

        return {
            date: new Date(date),
            count: found ? found.count : 0,
        };
    });

    const total: number = transactionsPerDay.total;

    return { chart, total };
};
