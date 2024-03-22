import { getAvgSumCount, getPercent } from '../../utils';
import { TransEarningDaily } from '../../types/transactionTypes';
import { OneStat } from '../../generated/graphql';

export const getAvgEarningFan = (
    transEarningDaily: TransEarningDaily[]
): OneStat => {
    let today = 0;
    let yesterday = 0;

    transEarningDaily.map((periodData) => {
        if (periodData.period === 'LAST_24H') {
            today = getAvgSumCount(
                periodData.getTransEarning.amount,
                periodData.getTransEarning.count
            );
        } else if (periodData.period === 'LAST_48H') {
            yesterday = getAvgSumCount(
                periodData.getTransEarning.amount,
                periodData.getTransEarning.count
            );
        }
    });

    const percent = getPercent(today, yesterday);

    return {
        today,
        yesterday,
        percent,
    };
};
