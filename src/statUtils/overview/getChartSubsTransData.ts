import { Connection } from 'mongoose';
import { MAX_TOP_MODELS } from '../../constants/others';
import {
    mergeManyChartData,
    mergeManySubsWithExpired,
} from '../../scraperUtils';
import {
    getActualAndExpiredFromSubs,
    getChartDataDB,
    getSubsDataDB,
    getTotalSum,
    getTransDataDB,
} from '../';
import { isWithinPeriod } from '../../utils';
import { ICreator } from '../../types';
import {
    SubsWithExpired,
    TransactionWithUser,
    MergedChartData,
    ISubscription,
} from '../../typesStat';

interface GetChartSubsTransDataRes {
    chartRespData: MergedChartData;
    subsLatestRespData: SubsWithExpired;
    transactionsRespData: TransactionWithUser[];
    topCreators: TopCreator[];
}

interface TopCreator {
    id: string;
    name: string;
    avatarUrl: string;
    revenueByPeriod: number;
}

export const getChartSubsTransData = async (
    creators: ICreator[],
    startDate: string,
    endDate: string,
    statConnection: Connection
): Promise<GetChartSubsTransDataRes> => {
    try {
        const chartRespDataSum: MergedChartData[] = [];
        const subsLatestRespDataSum: SubsWithExpired[] = [];
        const transactionsRespDataSum: TransactionWithUser[][] = [];
        const tempCreators = [...creators];
        const topModels: TopCreator[] = [];

        for (const creator of tempCreators) {
            if (!creator.creatorAuth) {
                throw new Error('CreatorAuth is undefined');
            }

            const chartRespPromise = getChartDataDB(
                startDate,
                endDate,
                creator.creatorAuth,
                statConnection
            );

            const subsLatestRespPromise = getSubsDataDB(
                new Date(creator.joinDate).toISOString(),
                new Date().toISOString(),
                creator.creatorAuth,
                statConnection
            );

            const transactionsRespAllTimePromise = getTransDataDB(
                creator.joinDate,
                creator.creatorAuth,
                statConnection
            );

            const [chartRespData, subsLatestRespData, transAllTimeRespData] =
                await Promise.all([
                    chartRespPromise,
                    subsLatestRespPromise,
                    transactionsRespAllTimePromise,
                ]);

            const subsLatestDateFiltered = (<ISubscription[]>(
                subsLatestRespData
            )).filter((item) =>
                isWithinPeriod(
                    item.startDate,
                    new Date(startDate),
                    new Date(endDate)
                )
            ) as ISubscription[];

            const actualAndExpiredSubs = getActualAndExpiredFromSubs(
                subsLatestDateFiltered,
                endDate
            );

            const chartRespDataTyped = chartRespData as MergedChartData;

            chartRespDataSum.push(chartRespDataTyped);
            subsLatestRespDataSum.push(actualAndExpiredSubs);
            transactionsRespDataSum.push(
                <TransactionWithUser[]>transAllTimeRespData
            );

            const totalSumChart = getTotalSum(chartRespDataTyped.sum);

            if (totalSumChart) {
                topModels.push({
                    id: creator.id,
                    name: creator.userName || '',
                    avatarUrl: creator.avatarURL || '',
                    revenueByPeriod: Math.round(totalSumChart),
                });
            }
        }

        topModels.sort((a, b) => b.revenueByPeriod - a.revenueByPeriod);
        const top5Models = topModels.slice(0, MAX_TOP_MODELS);

        return {
            chartRespData: mergeManyChartData(chartRespDataSum),
            subsLatestRespData: mergeManySubsWithExpired(subsLatestRespDataSum),
            transactionsRespData: transactionsRespDataSum.flat(),
            topCreators: top5Models,
        };
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
