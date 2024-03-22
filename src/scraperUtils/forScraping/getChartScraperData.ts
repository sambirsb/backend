import { ENDPOINTS_OF, FILTERS_OF } from '../../constants/apiEndpointsOF';
import { getDatesFilter } from '../getDataUtils';
import { scrapeDataCustomWithProxy } from './scrapeDataCustomWithProxy';
import { OFChartDatesAmountResponse } from '../../typesStat/fromOF/OFChartDatesAmountResponse';
import { CreatorAuth } from '../../generated/graphql';

export const getChartScraperData = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth
): Promise<OFChartDatesAmountResponse> => {
    try {
        const DATES_FILTER = await getDatesFilter(startDate, endDate);
        const chartPath = `${ENDPOINTS_OF.chart}${DATES_FILTER}${FILTERS_OF.amountFilter}`;

        return await scrapeDataCustomWithProxy(chartPath, creatorAuth);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
