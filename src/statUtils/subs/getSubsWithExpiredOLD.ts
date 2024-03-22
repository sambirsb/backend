import { Connection } from 'mongoose';
import { getActualAndExpiredFromSubs, getSubsDataDB } from '../index';
import { SubsWithExpired } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getSubsWithExpiredOLD = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth,
    statConnection: Connection
): Promise<SubsWithExpired> => {
    try {
        const subsDataDB = await getSubsDataDB(
            startDate,
            endDate,
            creatorAuth,
            statConnection
        );

        return getActualAndExpiredFromSubs(subsDataDB, endDate);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
