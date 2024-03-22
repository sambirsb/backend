import { MAX_TOP_MODELS } from '../../constants/others';
import { isWithinPeriod } from '../../utils';
import { TransactionWithUser } from '../../typesStat';
import { TopFanOverview } from '../../generated/graphql';

interface FanAggregate {
    id: string;
    avatarUrl: string;
    name: string;
    totalRevenue: number;
}

export const getTopFansOverview = (
    startDate: string,
    endDate: string,
    transactionsRespData: TransactionWithUser[]
): TopFanOverview[] => {
    const fansRevenueAggregate: Record<string, FanAggregate> = {};

    transactionsRespData.forEach((transaction) => {
        const fanId = transaction.friend_user_id._id.toString();
        if (!fansRevenueAggregate[fanId]) {
            fansRevenueAggregate[fanId] = {
                id: fanId,
                avatarUrl: transaction.friend_user_id.avatarURL,
                name: transaction.friend_user_id.userName,
                totalRevenue: 0,
            };
        }
        fansRevenueAggregate[fanId].totalRevenue += transaction.amount;
    });

    const topFans = Object.values(fansRevenueAggregate)
        .sort((a, b) => b.totalRevenue - a.totalRevenue)
        .slice(0, MAX_TOP_MODELS);

    return topFans.map((fan) => {
        const transactionsForFan = transactionsRespData.filter(
            (transaction) =>
                transaction.friend_user_id._id.toString() === fan.id &&
                isWithinPeriod(
                    new Date(transaction.transactionDate),
                    new Date(startDate),
                    new Date(endDate)
                )
        );

        const revenueByPeriod = transactionsForFan.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        return {
            avatarUrl: fan.avatarUrl || '',
            name: fan.name,
            revenueByPeriod: Math.round(revenueByPeriod),
            totalRevenue: Math.round(fan.totalRevenue),
        };
    });
};
