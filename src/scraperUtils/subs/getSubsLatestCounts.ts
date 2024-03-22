import mongoose from 'mongoose';
import subsService from '../../servicesStat/SubsService';
import { getUserIdFromCreatorAuth } from '../../utils';
import { getSubsLatestScrapedData, mergeSubsDataAsDbType } from '../';
import { getSubsCountsWithPeriods } from '../../statUtils';
import { SubsLatestCountsDaily } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getSubsLatestCounts = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth,
    statConnection: mongoose.Connection
): Promise<SubsLatestCountsDaily[]> => {
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

        const mergedData = mergeSubsDataAsDbType(subs, subLatRespData);

        return getSubsCountsWithPeriods(startDate, mergedData);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
