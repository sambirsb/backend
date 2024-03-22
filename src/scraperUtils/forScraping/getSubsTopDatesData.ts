import { ENDPOINTS_OF, FILTERS_OF } from '../../constants/apiEndpointsOF';
import { scrapeDataCustomWithProxy } from '../index';
import { getDatesFilter } from '../getDataUtils';
import { OFSubscriptionLatestResponseData } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getSubsTopDatesData = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth
): Promise<OFSubscriptionLatestResponseData> => {
    try {
        const DATES_FILTER = await getDatesFilter(startDate, endDate);
        const subscriptionLatestPath = `${ENDPOINTS_OF.subscribersTop}${DATES_FILTER}${FILTERS_OF.totalAndOffset}`;

        return await scrapeDataCustomWithProxy(
            subscriptionLatestPath,
            creatorAuth
        );
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
