import { ChartTypesForCreator, SubsLatestDataForCreator } from '../';
import { OfDetStat } from '../../generated/graphql';

export const toOFDetailedStats = (
    chartTypesForEachCreator: ChartTypesForCreator[],
    subsLatestDataForEachCreator: SubsLatestDataForCreator[]
): OfDetStat[] => {
    return chartTypesForEachCreator.map((chartData) => {
        const subsData = subsLatestDataForEachCreator.find(
            (subs) => subs.creatorId === chartData.creatorId
        ) || {
            totalActiveFans: 0,
            newActiveFans: 0,
            newSubs: 0,
            renews: 0,
            expired: 0,
        };

        return {
            ...chartData,
            ...subsData,
        };
    });
};
