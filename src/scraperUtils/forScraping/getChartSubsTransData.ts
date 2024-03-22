import mongoose from 'mongoose';
import { MAX_TOP_MODELS } from '../../constants/others';
import {
    getChartDatesAmountData,
    getTransactionsData,
    mergeManyChartData,
    mergeManySubsWithExpired,
    mergeManySubsTopData,
    getSubsTopDatesData,
} from '../';
import { getSubsWithExpiredOLD } from '../../statUtils';
import { ICreator, SubsTopData } from '../../types';
import {
    SubsWithExpired,
    TransactionWithUser,
    MergedChartData,
    OFSubscriptionLatestResponseData,
} from '../../typesStat';

interface GetChartSubsTransDataRes {
    chartRespData: MergedChartData;
    subsLatestRespData: SubsWithExpired;
    subsTopData: SubsTopData[];
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
    statConnection: mongoose.Connection
): Promise<GetChartSubsTransDataRes> => {
    try {
        const chartRespDataSum: MergedChartData[] = [];
        const subsLatestRespDataSum: SubsWithExpired[] = [];
        const subsTopDataSum: OFSubscriptionLatestResponseData[] = [];
        const transactionsRespDataSum: TransactionWithUser[][] = [];
        const tempCreators = [...creators];
        const topModels: TopCreator[] = [];

        for (const creator of tempCreators) {
            if (!creator.creatorAuth) {
                throw new Error('CreatorAuth is undefined');
            }

            const chartRespPromise = getChartDatesAmountData(
                startDate,
                endDate,
                creator.creatorAuth,
                statConnection
            );

            const subsLatestRespPromise = getSubsWithExpiredOLD(
                startDate,
                endDate,
                creator.creatorAuth,
                statConnection
            );

            const subsTopRespPromise = getSubsTopDatesData(
                new Date(creator.joinDate).toISOString(),
                new Date().toISOString(),
                creator.creatorAuth
            );

            const transactionsRespPromise = getTransactionsData(
                startDate,
                creator.creatorAuth,
                statConnection
            );

            const [
                chartRespData,
                subsLatestRespData,
                subsTopRespData,
                transactionsRespData,
            ] = await Promise.all([
                chartRespPromise,
                subsLatestRespPromise,
                subsTopRespPromise,
                transactionsRespPromise,
            ]);

            chartRespDataSum.push(<MergedChartData>chartRespData);
            subsLatestRespDataSum.push(<SubsWithExpired>subsLatestRespData);
            subsTopDataSum.push(
                <OFSubscriptionLatestResponseData>subsTopRespData
            );
            transactionsRespDataSum.push(
                <TransactionWithUser[]>transactionsRespData
            );

            const totalObj = (<MergedChartData>chartRespData).sum.find(
                (item) => item.name === 'total'
            );

            if (totalObj) {
                topModels.push({
                    id: creator.id,
                    name: creator.userName || '',
                    avatarUrl: creator.avatarURL || '',
                    revenueByPeriod: Math.round(totalObj.count),
                });
            }
        }

        topModels.sort((a, b) => b.revenueByPeriod - a.revenueByPeriod);
        const top5Models = topModels.slice(0, MAX_TOP_MODELS);

        return {
            chartRespData: mergeManyChartData(chartRespDataSum),
            subsLatestRespData: mergeManySubsWithExpired(subsLatestRespDataSum),
            subsTopData: mergeManySubsTopData(subsTopDataSum),
            transactionsRespData: transactionsRespDataSum.flat(),
            topCreators: top5Models,
        };
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
