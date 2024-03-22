import { SubsLatestData } from '../../types';

export interface SubsLatestDataForCreator {
    creatorId: string;
    totalActiveFans: number;
    newActiveFans: number;
    newSubs: number;
    renews: number;
    expired: number;
}

export const getSubsLatestDataForEachCreator = (
    startDate: string,
    subsLatestDataArr: SubsLatestData[]
): SubsLatestDataForCreator[] => {
    return subsLatestDataArr.map((subsLatestData) => {
        const data = subsLatestData.subsLatestData;

        const newSubs = data.actual.filter((sub) => {
            const subStartDate = new Date(sub.startDate);
            return subStartDate >= new Date(startDate);
        });

        const newActiveFans = newSubs.filter((sub) => sub.price > 0).length;

        return {
            creatorId: subsLatestData.creatorId,
            totalActiveFans: data.actual.length || 0,
            newActiveFans,
            newSubs: newSubs.length || 0,
            renews: 0,
            expired: data.expired.length || 0,
        };
    });
};
