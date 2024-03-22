import { SubsLatestCountsDaily } from '../../typesStat';

export const mergeSubsCounts = (
    data: SubsLatestCountsDaily[][]
): SubsLatestCountsDaily[] => {
    const result: SubsLatestCountsDaily[] = [];

    data.forEach((subsArray) => {
        subsArray.forEach((sub) => {
            const existingSub = result.find((r) => r.period === sub.period);
            if (existingSub) {
                existingSub.getSubsLatestCounts.newSubsWithPrice +=
                    sub.getSubsLatestCounts.newSubsWithPrice;
                existingSub.getSubsLatestCounts.allNewSubs +=
                    sub.getSubsLatestCounts.allNewSubs;
            } else {
                result.push({
                    period: sub.period,
                    getSubsLatestCounts: {
                        newSubsWithPrice:
                            sub.getSubsLatestCounts.newSubsWithPrice,
                        allNewSubs: sub.getSubsLatestCounts.allNewSubs,
                    },
                });
            }
        });
    });

    return result;
};
