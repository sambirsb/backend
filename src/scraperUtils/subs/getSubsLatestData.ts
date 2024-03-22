import mongoose from 'mongoose';
import subsService from '../../servicesStat/SubsService';
import { mergeSubsData } from './mergeSubsData';
import { fillDatesInChart } from '../chartData/fillDatesInChart';
import { getUserIdFromCreatorAuth } from '../../utils/';
import { getSubsLatestScrapedData } from '../index';
import { CreatorAuth, StatisticSection } from '../../generated/graphql';

export const getSubsLatestData = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth,
    statConnection: mongoose.Connection
): Promise<StatisticSection> => {
    try {
        const user_id = await getUserIdFromCreatorAuth(creatorAuth);
        const subs = await subsService.getSubs(
            startDate,
            endDate,
            user_id,
            statConnection
        );

        const subLatRespData = await getSubsLatestScrapedData(
            subs.preUpdateDate,
            endDate,
            creatorAuth
        );

        if (!subLatRespData) {
            return { chart: [], total: 0 };
        }

        const mergedData = mergeSubsData(subs, subLatRespData);

        return fillDatesInChart(mergedData.chart, startDate, endDate);
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
