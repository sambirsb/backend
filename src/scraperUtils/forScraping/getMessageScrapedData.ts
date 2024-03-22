import { ENDPOINTS_OF, FILTERS_OF } from '../../constants/apiEndpointsOF';
import { scrapeDataCustomWithProxy } from './scrapeDataCustomWithProxy';
import { OFMessagesResponseData } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getMessageScrapedData = async (
    chatterId: string,
    creatorAuth: CreatorAuth
): Promise<OFMessagesResponseData> => {
    try {
        const messagesPath = `${ENDPOINTS_OF.chatters}/${chatterId}/${FILTERS_OF.messagesLimit}`;

        return await scrapeDataCustomWithProxy(messagesPath, creatorAuth);
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
