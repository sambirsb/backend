import { ENDPOINTS_OF, FILTERS_OF } from '../../constants/apiEndpointsOF';
import { scrapeDataCustomWithProxy } from './scrapeDataCustomWithProxy';
import { OFChattersResponseData } from '../../typesStat/fromOF/OFChattersResponseData';
import { CreatorAuth } from '../../generated/graphql';

export const getChattersScrapedData = async (
    creatorAuth: CreatorAuth
): Promise<OFChattersResponseData> => {
    try {
        const chattersPath = `${ENDPOINTS_OF.chatters}${FILTERS_OF.chatsLimit}`;

        return await scrapeDataCustomWithProxy(chattersPath, creatorAuth);
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
