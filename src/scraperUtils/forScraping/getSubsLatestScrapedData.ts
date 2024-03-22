import { ENDPOINTS_OF, FILTERS_OF } from '../../constants/apiEndpointsOF';
import { scrapeDataCustomWithProxy } from './scrapeDataCustomWithProxy';
import { getDatesFilter } from '../getDataUtils';
import { OFSubscriptionLatestResponseData } from '../../typesStat/fromOF/OFSubscriptionLatestResponseData';
import { CreatorAuth } from '../../generated/graphql';

export const getSubsLatestScrapedData = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth
): Promise<OFSubscriptionLatestResponseData> => {
    try {
        const DATES_FILTER = await getDatesFilter(startDate, endDate);
        const subscriptionLatestPath = `${ENDPOINTS_OF.subscribersLatest}${DATES_FILTER}${FILTERS_OF.totalAndOffset}`;

        return await scrapeDataCustomWithProxy(
            subscriptionLatestPath,
            creatorAuth
        );
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
