import { TimePeriod } from '../../constants/TimePeriod';
import { get2Last24hPeriods } from '../../utils';
import { getTransEarningWithIntervals } from '../';
import { TransactionWithUser } from '../../typesStat';
import { TransEarningDailyWithIntervals } from '../../types/transactionTypes';

export const getTransEarningWithPeriods = (
    startDate: string,
    data: TransactionWithUser[]
): TransEarningDailyWithIntervals => {
    const { endDateTime, period24hAgo, period48hAgo, period72hAgo } =
        get2Last24hPeriods(startDate);

    const periods = [
        { start: period24hAgo, end: endDateTime, period: TimePeriod.LAST_24H },
        { start: period48hAgo, end: period24hAgo, period: TimePeriod.LAST_48H },
        { start: period72hAgo, end: period48hAgo, period: TimePeriod.LAST_72H },
    ];

    const transEarningWithIntervals = getTransEarningWithIntervals(
        startDate,
        data
    );

    const transEarningDaily = periods.map(({ start, end, period }) => {
        const filteredTransactions = data.filter((transaction) => {
            const transactionDate = new Date(transaction.transactionDate);
            return transactionDate >= start && transactionDate < end;
        });

        const totalAmount = filteredTransactions.reduce(
            (acc, curr) => acc + curr.amount,
            0
        );
        const totalCount = filteredTransactions.length;

        return {
            period,
            getTransEarning: {
                amount: totalAmount,
                count: totalCount,
            },
        };
    });

    return {
        transEarningDaily,
        transEarningWithIntervals,
    };
};
