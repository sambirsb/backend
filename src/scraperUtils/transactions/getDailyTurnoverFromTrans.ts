import { TimePeriod } from '../../constants/TimePeriod';
import { getPercent } from '../../utils/';
import { TransEarningDaily } from '../../types/transactionTypes';
import { OneStat } from '../../generated/graphql';

interface ToDailyStatsChartData {
    prev24hTotal: number;
    prev24hPercent: number;
    revenue: OneStat;
}

export const getDailyTurnoverFromTrans = (
    data: TransEarningDaily[]
): ToDailyStatsChartData => {
    const last24hData = data.find((d) => d.period === TimePeriod.LAST_24H);
    const last48hData = data.find((d) => d.period === TimePeriod.LAST_48H);
    const last72hData = data.find((d) => d.period === TimePeriod.LAST_72H);

    const totalLast24hData = last24hData?.getTransEarning.amount ?? 0;
    const totalLast48hData = last48hData?.getTransEarning.amount ?? 0;
    const totalLast72hData = last72hData?.getTransEarning.amount ?? 0;

    const totalPercentPrevious24h = getPercent(
        totalLast48hData,
        totalLast72hData
    );

    const totalPercentActual24h = getPercent(
        totalLast24hData,
        totalLast48hData
    );

    return {
        prev24hTotal: totalLast48hData,
        prev24hPercent: totalPercentPrevious24h,
        revenue: {
            today: totalLast24hData,
            yesterday: totalLast48hData,
            percent: totalPercentActual24h,
        },
    };
};
