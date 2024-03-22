import { ChartAmountTotalAll } from '../typesStat/ChartDatesAmount';
import { DetStatsResponse } from '../generated/graphql';

export const chartsToDetStatsMap = (
    data: ChartAmountTotalAll[]
): DetStatsResponse[] =>
    data.map((entry) => ({
        date: entry.date,
        totalRevenue: entry.total,
        newSubs: 0,
        newSubsRevenue: entry.subscribes,
        recSubsRevenue: 0,
        tipsRevenue: entry.tips,
        messagesRevenue: entry.chat_messages,
        textingRation: 0,
        openChats: 0,
        sellingChats: 0,
        linkClicks: 0,
        conversionRate: 0,
    }));
