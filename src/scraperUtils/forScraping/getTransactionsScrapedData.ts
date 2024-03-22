import { ENDPOINTS_OF } from '../../constants/apiEndpointsOF';
import { scrapeDataCustomWithProxy } from './scrapeDataCustomWithProxy';
import { getStartDateFilter } from '../getDataUtils';
import { OFTransactionsResponseData } from '../../typesStat/fromOF/OFTransactionsResponseData';
import { CreatorAuth } from '../../generated/graphql';

export const getTransactionsScrapedData = async (
    startDate: string,
    creatorAuth: CreatorAuth
): Promise<OFTransactionsResponseData> => {
    try {
        const START_DATE_FILTER = await getStartDateFilter(startDate);
        const transactionsPath = `${ENDPOINTS_OF.transactions}${START_DATE_FILTER}`;

        return await scrapeDataCustomWithProxy(transactionsPath, creatorAuth);
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
