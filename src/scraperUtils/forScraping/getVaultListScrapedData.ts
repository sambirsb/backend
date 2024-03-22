import { ENDPOINTS_OF, FILTERS_OF } from '../../constants/apiEndpointsOF';
import { scrapeDataCustomWithProxy } from './scrapeDataCustomWithProxy';
import { OFVaultListResponse } from '../../typesStat/fromOF/OFVaultListResponseData';
import { CreatorAuth } from '../../generated/graphql';

export const getVaultListScrapedData = async (
    creatorAuth: CreatorAuth
): Promise<OFVaultListResponse> => {
    try {
        const vaultListPath = `${ENDPOINTS_OF.vaultLists}${FILTERS_OF.vaultListsLimit}`;

        return await scrapeDataCustomWithProxy(vaultListPath, creatorAuth);
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
