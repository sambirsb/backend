import { Connection } from 'mongoose';
import { MIN_REFRESH_RATE } from '../constants/others';
import creatorService from './CreatorService';
import { checkDatesDifference } from '../utils';
import {
    getLastUpdateDate,
    updateAmountChartData,
    updateTransactionsData,
    updateSubsLatestData,
    updateChattersData,
    updateVaultWithMedia,
} from '../scraperUtils';
import { elevateError } from '../errors/elevateError';
import { ICreator } from '../types';

class UpdateScrapeService {
    async updateCreatorsStats(
        token: string,
        creatorIds: string[],
        sta: Connection
    ) {
        try {
            const creators = (await creatorService.getCreatorsByIds(
                creatorIds,
                token
            )) as ICreator[];

            const updatePromises = creators.map(async (creator) => {
                if (!creator.creatorAuth) {
                    console.log(
                        `CreatorAuth for creator with id: ${creator._id} was undefined`
                    );
                    return null;
                }

                const lastUpdatedDate = getLastUpdateDate(creator);

                await Promise.all([
                    updateAmountChartData(lastUpdatedDate, creator, sta),
                    updateTransactionsData(lastUpdatedDate, creator, sta),
                    updateSubsLatestData(lastUpdatedDate, creator, sta),
                    updateChattersData(lastUpdatedDate, creator, sta),
                    updateVaultWithMedia(creator, sta),
                ]);

                creator.lastUpdatedDate = new Date();
                return creator.save();
            });

            const filteredPromises = updatePromises.filter(
                (promise) => promise !== null
            );

            await Promise.all(filteredPromises);

            return 'All data was successfully updated';
        } catch (err) {
            elevateError(err);
        }
    }

    async autoUpdateStats(
        token: string,
        creators: any[], //TODO change type
        sta: Connection
    ) {
        try {
            const creatorsForUpdateStatsIds: string[] = [];
            const currentTimeDate = new Date();

            for (const creator of creators) {
                if (
                    !creator.lastUpdatedDate ||
                    checkDatesDifference(
                        currentTimeDate,
                        creator.lastUpdatedDate,
                        MIN_REFRESH_RATE
                    )
                ) {
                    creatorsForUpdateStatsIds.push(creator._id.toString());
                }
            }

            await this.updateCreatorsStats(
                token,
                creatorsForUpdateStatsIds,
                sta
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async cronUpdateStats(creators: ICreator[], sta: Connection) {
        try {
            const updatePromises = creators.map(async (creator) => {
                if (!creator.creatorAuth) {
                    console.log(
                        `CreatorAuth for creator with id: ${creator._id} was undefined`
                    );
                    return null;
                }

                const lastUpdatedDate = getLastUpdateDate(creator);

                await Promise.all([
                    updateAmountChartData(lastUpdatedDate, creator, sta),
                    updateTransactionsData(lastUpdatedDate, creator, sta),
                    updateSubsLatestData(lastUpdatedDate, creator, sta),
                    updateChattersData(lastUpdatedDate, creator, sta),
                    updateVaultWithMedia(creator, sta),
                ]);

                creator.lastUpdatedDate = new Date();
                return creator.save();
            });

            const filteredPromises = updatePromises.filter(
                (promise) => promise !== null
            );

            await Promise.all(filteredPromises);

            return 'All data was successfully updated';
        } catch (err) {
            elevateError(err);
        }
    }
}

const updateScrapeService = new UpdateScrapeService();
export default updateScrapeService;
