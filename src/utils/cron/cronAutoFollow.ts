import cron from 'node-cron';
import CreatorModel from '../../models/CreatorModel';
import autoFollowService from '../../services/AutoFollowService';
import { getExpiredFansList, postSubscribeOnUser } from '../../scraperUtils';
import { delay } from '../';
import { IAutoFollow, IDataSource, ICreator } from '../../types';
import { CreatorAuth } from '../../generated/graphql';

export async function cronAutoFollow() {
    cron.schedule('0 */12 * * *', async () => {
        const creators = (await CreatorModel.find({
            'creatorAuth.expiredAt': { $gt: new Date() },
        })) as ICreator[];

        for (let i = 0; i < creators.length; i++) {
            try {
                const autoFollow =
                    (await autoFollowService.getAFByCreatorIdWebSocket(
                        creators[i].id
                    )) as IAutoFollow;

                if (autoFollow.active) {
                    const expiredFansList = await getExpiredFansList(
                        creators[i].creatorAuth as CreatorAuth
                    );
                    const list = expiredFansList?.list;

                    if (list) {
                        for (let i = 0; i < list.length; i++) {
                            await delay(600);
                            if (
                                list[i].subscribedBy === false &&
                                list[i].subscribedOn === false
                            ) {
                                if (
                                    (autoFollow.minSpend || 0) <
                                    (list[i]?.subscribedOnData?.totalSumm || 0)
                                ) {
                                    const data: IDataSource = {
                                        source: 'profile',
                                    };

                                    await postSubscribeOnUser(
                                        data,
                                        creators[i].creatorAuth as CreatorAuth,
                                        list[i].id
                                    );
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.error(
                    `Error using promotion reactivator for creator ${creators[i].id}`,
                    error
                );
            }
        }
    });
}
