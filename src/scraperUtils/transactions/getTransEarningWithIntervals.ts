import { get2Last24hPeriods } from '../../utils';
import { TransactionWithUser } from '../../typesStat';
import { DateAndAmount } from '../../generated/graphql';

const generateIntervals = (start: Date, end: Date) => {
    const intervals = [];
    let current = start;
    while (current < end) {
        const next = new Date(current.getTime() + 15 * 60000);
        intervals.push({ start: new Date(current), end: new Date(next) });
        current = next;
    }
    return intervals;
};

const calculateAmountsForIntervals = (
    intervals: { start: Date; end: Date }[],
    transactions: TransactionWithUser[]
): DateAndAmount[] => {
    return intervals.map(({ start, end }) => {
        const amountInInterval = transactions.reduce((acc, transaction) => {
            const transactionDate = new Date(transaction.transactionDate);
            if (transactionDate >= start && transactionDate < end) {
                return acc + transaction.amount;
            }
            return acc;
        }, 0);

        return { date: start, amount: amountInInterval };
    });
};

export const getTransEarningWithIntervals = (
    startDate: string,
    data: TransactionWithUser[]
): DateAndAmount[] => {
    const { period24hAgo, period48hAgo } = get2Last24hPeriods(startDate);

    const filteredTransactions = data.filter((transaction) => {
        const transactionDate = new Date(transaction.transactionDate);
        return (
            transactionDate >= period48hAgo && transactionDate < period24hAgo
        );
    });

    const intervals = generateIntervals(period48hAgo, period24hAgo);

    return calculateAmountsForIntervals(intervals, filteredTransactions);
};
