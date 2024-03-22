import { TimePeriod } from '../../constants/TimePeriod';
import { getPercent } from '../../utils';
import { SubsLatestCountsDaily } from '../../typesStat';
import { OneStat } from '../../generated/graphql';

interface SubsAndFansDaily {
    fans: OneStat;
    newSubs: OneStat;
}

export const toSubsAndFansDaily = (
    startDate: string,
    data: SubsLatestCountsDaily[]
): SubsAndFansDaily => {
    const todayData = data.find((d) => d.period === TimePeriod.LAST_24H)
        ?.getSubsLatestCounts;
    const yesterdayData = data.find((d) => d.period === TimePeriod.LAST_48H)
        ?.getSubsLatestCounts;

    const fans = {
        today: todayData?.allNewSubs || 0,
        yesterday: yesterdayData?.allNewSubs || 0,
        percent: getPercent(
            todayData?.allNewSubs || 0,
            yesterdayData?.allNewSubs || 0
        ),
    };

    const newSubs = {
        today: todayData?.newSubsWithPrice || 0,
        yesterday: yesterdayData?.newSubsWithPrice || 0,
        percent: getPercent(
            todayData?.newSubsWithPrice || 0,
            yesterdayData?.newSubsWithPrice || 0
        ),
    };

    return { fans, newSubs };
};
