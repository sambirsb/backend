import {
    getTransEarningWithPeriods,
    getDailyTurnoverFromTrans,
    getAvgEarningFan,
} from '../../scraperUtils';
import { TransactionWithUser } from '../../typesStat';
import { OneStat, StatSectionPercents } from '../../generated/graphql';

interface TurnoversAndAvgEarning {
    previous24hTurnover: StatSectionPercents;
    revenue: OneStat;
    avgEarningFan: OneStat;
}

export const getTurnoverAndAvgEarnings = (
    startDate: string,
    transactionsRespDataRes: TransactionWithUser[]
): TurnoversAndAvgEarning => {
    const { transEarningDaily, transEarningWithIntervals } =
        getTransEarningWithPeriods(startDate, transactionsRespDataRes);

    const { prev24hTotal, prev24hPercent, revenue } =
        getDailyTurnoverFromTrans(transEarningDaily);

    return {
        previous24hTurnover: {
            chart: transEarningWithIntervals,
            total: prev24hTotal,
            percent: prev24hPercent,
        },
        revenue,
        avgEarningFan: getAvgEarningFan(transEarningDaily),
    };
};
