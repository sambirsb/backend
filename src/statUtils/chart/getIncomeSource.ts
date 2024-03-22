import { IncomeSource } from '../../generated/graphql';

interface IncomeSourceInput {
    total: number;
    subscriptionsTotal: number;
    tipsTotal: number;
    postsTotal: number;
    messagesTotal: number;
    referralsTotal: number;
    streamsTotal: number;
}

export const getIncomeSource = (data: IncomeSourceInput): IncomeSource => {
    const total = data.total;

    if (total === 0) {
        return {
            subscriptions: { total: 0, percent: 0 },
            tips: { total: 0, percent: 0 },
            posts: { total: 0, percent: 0 },
            messages: { total: 0, percent: 0 },
            referrals: { total: 0, percent: 0 },
            streams: { total: 0, percent: 0 },
        };
    }

    const subscriptionsPercent = Math.round(
        (data.subscriptionsTotal / total) * 100
    );

    const tipsPercent = Math.round((data.tipsTotal / total) * 100);
    const postsPercent = Math.round((data.postsTotal / total) * 100);
    const messagesPercent = Math.round((data.messagesTotal / total) * 100);
    const referralsPercent = Math.round((data.referralsTotal / total) * 100);
    const streamsPercent = Math.round((data.streamsTotal / total) * 100);

    return {
        subscriptions: {
            total: Math.round(data.subscriptionsTotal),
            percent: subscriptionsPercent,
        },
        tips: { total: Math.round(data.tipsTotal), percent: tipsPercent },
        posts: { total: Math.round(data.postsTotal), percent: postsPercent },
        messages: {
            total: Math.round(data.messagesTotal),
            percent: messagesPercent,
        },
        referrals: {
            total: Math.round(data.referralsTotal),
            percent: referralsPercent,
        },
        streams: {
            total: Math.round(data.streamsTotal),
            percent: streamsPercent,
        },
    };
};
