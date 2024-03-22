import { ENDPOINTS_OF, FILTERS_OF } from '../../constants/apiEndpointsOF';
import { getDatesFilter } from '../index';
import { scrapeDataCustomWithProxy } from '../index';
import { CreatorAuth, DateAndCount } from '../../generated/graphql';

export const getVisitorsData = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth
): Promise<DateAndCount[]> => {
    try {
        const DATES_FILTER = await getDatesFilter(startDate, endDate);

        const visitorsPath = `${ENDPOINTS_OF.visitors}${DATES_FILTER}${FILTERS_OF.totalAndOffset}`;
        const visitorsResponse = await scrapeDataCustomWithProxy(
            visitorsPath,
            creatorAuth
        );

        if (!visitorsResponse) {
            return [];
        }

        return visitorsResponse.chart.visitors || [];
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
