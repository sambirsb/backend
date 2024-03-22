import { TimePeriod } from '../../constants/TimePeriod';
import { get2Last24hPeriods, isWithinPeriod } from '../../utils';
import { ActualSubsData, SubsLatestCountsDaily } from '../../typesStat';

export const getSubsCountsWithPeriods = (
    startDate: string,
    data: ActualSubsData[]
): SubsLatestCountsDaily[] => {
    const { endDateTime, period24hAgo, period48hAgo } =
        get2Last24hPeriods(startDate);

    const results: SubsLatestCountsDaily[] = [
        {
            period: TimePeriod.LAST_24H,
            getSubsLatestCounts: { newSubsWithPrice: 0, allNewSubs: 0 },
        },
        {
            period: TimePeriod.LAST_48H,
            getSubsLatestCounts: { newSubsWithPrice: 0, allNewSubs: 0 },
        },
        {
            period: TimePeriod.LAST_72H,
            getSubsLatestCounts: { newSubsWithPrice: 0, allNewSubs: 0 },
        },
    ];

    data.forEach((sub) => {
        const subStartDate = new Date(sub.startDate);

        if (isWithinPeriod(subStartDate, period24hAgo, endDateTime)) {
            results[0].getSubsLatestCounts.newSubsWithPrice += sub.price;
            results[0].getSubsLatestCounts.allNewSubs += 1;
        } else if (isWithinPeriod(subStartDate, period48hAgo, period24hAgo)) {
            results[1].getSubsLatestCounts.newSubsWithPrice += sub.price;
            results[1].getSubsLatestCounts.allNewSubs += 1;
        } else if (subStartDate < period48hAgo) {
            results[2].getSubsLatestCounts.newSubsWithPrice += sub.price;
            results[2].getSubsLatestCounts.allNewSubs += 1;
        }
    });

    return results;
};
