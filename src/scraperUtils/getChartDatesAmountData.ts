import mongoose from 'mongoose';
import chartService from '../servicesStat/ChartService';
import { getChartScraperData, mergeChartData } from './index';
import { getUserIdFromCreatorAuth } from '../utils';
import { MergedChartData } from '../typesStat';
import { CreatorAuth } from '../generated/graphql';

export const getChartDatesAmountData = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth,
    statConnection: mongoose.Connection
): Promise<MergedChartData> => {
    try {
        const user_id = await getUserIdFromCreatorAuth(creatorAuth);

        const resp = await chartService.findChartDatesAmounts(
            startDate,
            endDate,
            user_id,
            statConnection
        );

        const updatedDate = new Date(resp.preUpdateDate).toISOString();

        const data = await getChartScraperData(
            updatedDate,
            endDate,
            creatorAuth
        );

        if (!data) {
            return { chartAmountTotalAll: [], sum: [] };
        }

        return mergeChartData(resp.chartDatesAmounts, data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
