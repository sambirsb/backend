import { Connection } from 'mongoose';
import { getSubsWithExpiredOLD, getSubsCountsWithPeriods } from '../';
import { SubsLatestCountsDaily } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getSubsLatestCounts = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth,
    statConnection: Connection
): Promise<SubsLatestCountsDaily[]> => {
    try {
        const { actual } = await getSubsWithExpiredOLD(
            startDate,
            endDate,
            creatorAuth,
            statConnection
        );

        return getSubsCountsWithPeriods(startDate, actual);
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
