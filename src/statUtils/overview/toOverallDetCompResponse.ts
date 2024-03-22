import { getTextingRation } from '../';
import {
    NewSubsCountWithCreatorIdAndName,
    OpenChatsCountWithCreatorIdAndName,
    SumRevenuesWithCreatorIdAndName,
} from '../../typesStat';
import { OverallDetCompResponse } from '../../generated/graphql';

export const toOverallDetCompResponse = (
    sumRevenuesData: SumRevenuesWithCreatorIdAndName[],
    newSubsCountData: NewSubsCountWithCreatorIdAndName[],
    openChatsCountData: OpenChatsCountWithCreatorIdAndName[]
): OverallDetCompResponse[] => {
    const newSubsCountMap = new Map(
        newSubsCountData.map((item) => [item.creatorId, item.newSubsCount])
    );
    const openChatsMap = new Map(
        openChatsCountData.map((item) => [
            item.creatorId,
            { openChats: item.openChats, sellingChats: item.sellingChats },
        ])
    );

    return sumRevenuesData.map(({ creatorId, creatorName, sumRevenues }) => {
        const newSubsCount = newSubsCountMap.get(creatorId) || 0;
        const { openChats, sellingChats } = openChatsMap.get(creatorId) || {
            openChats: 0,
            sellingChats: 0,
        };

        return {
            creatorId,
            creatorName,
            totalRevenue: sumRevenues.totalRevenue,
            tipsRevenue: sumRevenues.tips,
            messagesRevenue: sumRevenues.chat_messages,
            newSubsRevenue: sumRevenues.subscribes,
            newSubs: newSubsCount,
            openChats,
            sellingChats,
            textingRation: getTextingRation(sumRevenues),
        };
    });
};
