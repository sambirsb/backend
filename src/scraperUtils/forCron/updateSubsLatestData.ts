import { Connection } from 'mongoose';
import subsService from '../../servicesStat/SubsService';
import { getSubsLatestScrapedData } from '../index';
import { elevateError } from '../../errors/elevateError';
import { OFSubscriptionLatestResponseData } from '../../typesStat';
import { ICreator } from '../../types';

export const updateSubsLatestData = async (
    lastUpdatedDate: Date,
    creator: ICreator,
    connection: Connection
) => {
    try {
        const user_id = creator.creatorAuth?.user_id;

        if (!creator.creatorAuth || !user_id) {
            throw new Error('CreatorAuth is undefined');
        }

        const actualData = (await getSubsLatestScrapedData(
            lastUpdatedDate.toISOString(),
            new Date().toISOString(),
            creator.creatorAuth
        )) as OFSubscriptionLatestResponseData;

        if (!actualData) return;

        await subsService.updateSubs(actualData, user_id, connection);
    } catch (err) {
        elevateError(err);
    }
};
