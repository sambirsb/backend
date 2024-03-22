import { getSubsLatestScrapedData, mergeSubsDataAsDbType } from '../';
import { getSubsCountsWithPeriods } from '../../statUtils';
import { GetSubsResponse, SubsLatestCountsDaily } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getSubsLatestCountsNoDB = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth
): Promise<SubsLatestCountsDaily[]> => {
    try {
        const subLatRespData = await getSubsLatestScrapedData(
            startDate,
            endDate,
            creatorAuth
        );
        const mockDBData: GetSubsResponse = {
            user_id: '',
            preUpdateDate: '',
            transactions: [],
        };

        const mergedData = mergeSubsDataAsDbType(mockDBData, subLatRespData);

        return getSubsCountsWithPeriods(startDate, mergedData);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
