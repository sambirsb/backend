import { MAX_TOP_FANS } from '../../constants/others';
import { SubsTopData } from '../../types';
import { TransactionWithUser } from '../../typesStat';
import { TopFanOverview } from '../../generated/graphql';

export const getTopChattersFromSubsTopData = (
    startDate: string,
    endDate: string,
    subsTopData: SubsTopData[],
    transactionsRespData: TransactionWithUser[]
): TopFanOverview[] => {
    const topSubs = subsTopData
        .sort((a, b) => b.total - a.total)
        .slice(0, MAX_TOP_FANS);

    return topSubs.map((sub) => {
        const transactionsForUser = transactionsRespData.filter(
            (transaction) =>
                transaction.user_id.toString() === sub.id &&
                new Date(transaction.transactionDate) >= new Date(startDate) &&
                new Date(transaction.transactionDate) <= new Date(endDate)
        );

        const revenueByPeriod = transactionsForUser.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        return {
            avatarUrl: sub.avatarUrl,
            name: sub.name,
            revenueByPeriod: Math.round(revenueByPeriod),
            totalRevenue: Math.round(sub.total),
        };
    });
};
