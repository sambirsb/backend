import cron from 'node-cron';
import { OFPromotion } from '../../constants/OFPromotion';
import CreatorModel from '../../models/CreatorModel';
import PromotionReactivatorService from '../../services/PromotionReactivatorService';
import { getMeInformation, postPromotionData } from '../../scraperUtils';
import { delay } from '../';
import { IPromotionReactivator } from '../../types';

export const cronPromotionReactivator = async () => {
    cron.schedule('* * * * *', async () => {
        const creators = (await CreatorModel.find({
            'creatorAuth.expiredAt': { $gt: new Date() },
        })) as any[];

        for (let i = 0; i < creators.length; i++) {
            try {
                const promotionReactivator =
                    (await PromotionReactivatorService.getPRByCreatorIdWebSocket(
                        creators[i].id
                    )) as IPromotionReactivator;

                if (promotionReactivator.active) {
                    const me = await getMeInformation(creators[i].creatorAuth);

                    const promotions = me.promotions;

                    if (promotions) {
                        for (let i = 0; i < promotions.length; i++) {
                            if (promotions[i].isFinished) {
                                await delay(600);

                                const promotionData = {
                                    discount: OFPromotion.discount,
                                    finishDays: promotionReactivator.period,
                                    message: promotions[i].message,
                                    subscribeCounts:
                                        promotions[i].subscribeCounts,
                                    subscribeDays: promotions[i].subscribeDays,
                                    type: [promotions[i].type],
                                };

                                await postPromotionData(
                                    promotionData,
                                    creators[i].creatorAuth
                                );
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
};
