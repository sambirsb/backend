import { Connection, QueryOptions } from 'mongoose';
import SubscriptionModel from '../modelsStat/SubscriptionModel';
import publicDataService from './PublicDataService';
import { getEarlierDate } from '../utils/';
import { elevateError } from '../errors/elevateError';
import { toSubsDB } from '../statUtils';
import {
    OFSubscriptionLatestResponseData,
    ISubscription,
    GetSubsResponse,
} from '../typesStat';

class SubsService {
    async getSubs(
        startDate: string,
        endDate: string,
        user_id: string,
        statConnection: Connection
    ): Promise<GetSubsResponse> {
        try {
            const SubsModelObj = SubscriptionModel(statConnection);

            const subs = (await SubsModelObj.find({
                user_id,
                startDate: {
                    $gte: startDate,
                    $lte: endDate,
                },
            })) as ISubscription[];

            if (subs.length === 0) {
                return {
                    user_id,
                    preUpdateDate: startDate,
                    transactions: [],
                };
            }

            return {
                user_id,
                preUpdateDate: getEarlierDate(
                    subs[subs.length - 1].startDate.toString(),
                    1
                ),
                transactions: subs,
            };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async updateSubs(
        data: OFSubscriptionLatestResponseData,
        user_id: string,
        statConnection: Connection
    ) {
        try {
            const SubsModelObj = SubscriptionModel(statConnection);

            const friendUserNames = [
                ...new Set(data.users.map((user) => user.username)),
            ];
            await publicDataService.scrapedMissingPublicData(
                friendUserNames,
                statConnection
            );

            for (let i = 0; i < data.users.length; i++) {
                const subData = toSubsDB(user_id, data.users[i]);

                await SubsModelObj.findOneAndUpdate(
                    {
                        user_id: subData.user_id,
                        friend_user_id: subData.friend_user_id,
                    },
                    subData,
                    { upsert: true, new: true } as QueryOptions
                );
            }
        } catch (err) {
            elevateError(err);
        }
    }
}

const subsService = new SubsService();
export default subsService;
