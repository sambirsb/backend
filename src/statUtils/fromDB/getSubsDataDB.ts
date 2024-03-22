import { Connection } from 'mongoose';
import subsService from '../../servicesStat/SubsService';
import { getUserIdFromCreatorAuth } from '../../utils';
import { ISubscription } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getSubsDataDB = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth,
    statConnection: Connection
): Promise<ISubscription[]> => {
    try {
        const user_id = await getUserIdFromCreatorAuth(creatorAuth);
        const data = await subsService.getSubs(
            startDate,
            endDate,
            user_id,
            statConnection
        );

        return data.transactions;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
