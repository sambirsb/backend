import { TransactionWithUser } from '../../typesStat/TransactionTypes';
import { DateAndCount, StatisticSection } from '../../generated/graphql';

export const calculateTransactions = (
    transactions: TransactionWithUser[]
): StatisticSection => {
    const dateCounts: { [key: string]: number } = {};

    transactions.forEach((transaction) => {
        const date = transaction.transactionDate.split('T')[0];
        if (!dateCounts[date]) {
            dateCounts[date] = 0;
        }
        dateCounts[date]++;
    });

    const chart: DateAndCount[] = Object.keys(dateCounts).map((date) => ({
        date: new Date(date),
        count: dateCounts[date],
    }));

    const total: number = transactions.length;

    return { chart, total };
};
