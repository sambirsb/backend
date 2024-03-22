import mongoose from 'mongoose';
import creatorService from './CreatorService';
import publicDataService from '../servicesStat/PublicDataService';
import {
    getPublicLibScraperData,
    scrapeDataCustomWithProxy,
} from '../scraperUtils';
import { elevateError } from '../errors/elevateError';
import { ICreator } from '../types';

class ScraperService {
    async getPublicData(link: string, statConnection: mongoose.Connection) {
        try {
            const response = await getPublicLibScraperData(link);
            const { pathId, data } = response;

            return await publicDataService.createPublicData(
                data,
                pathId,
                statConnection
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async getChatsForMassMessaging(creatorId: string) {
        try {
            const creator = (await creatorService.getCreatorById(
                creatorId
            )) as ICreator;

            if (!creator.creatorAuth) {
                throw new Error('CreatorAuth is undefined');
            }

            const allChatsPath = `${process.env.ONLYFANS_API_PATH}/chats?limit=1000&offset=0&skip_users=all&order=recent`;
            const allChatsArray = await scrapeDataCustomWithProxy(
                allChatsPath,
                creator.creatorAuth
            );

            let chatIds;
            if (allChatsArray) {
                chatIds = allChatsArray.list.map(
                    (chat: { withUser: { id: number; _view: string } }) =>
                        chat.withUser.id
                );
            }

            let chatIdsQueryParam;
            if (chatIds) {
                chatIdsQueryParam = chatIds
                    .map((id: number) => `cl[]=${id}`)
                    .join('&');
            }

            const allUserChatsPath = `${process.env.ONLYFANS_API_PATH}/users/list?${chatIdsQueryParam}`;
            const allUserChatsObject = await scrapeDataCustomWithProxy(
                allUserChatsPath,
                creator.creatorAuth
            );

            if (!allUserChatsObject) {
                return [];
            }

            return Object.values(allUserChatsObject);
        } catch (err) {
            elevateError(err);
        }
    }
}

const scraperService = new ScraperService();
export default scraperService;
