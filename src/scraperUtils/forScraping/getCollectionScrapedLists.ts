import { ENDPOINTS_OF, FILTERS_OF } from '../../constants/apiEndpointsOF';
import { scrapeDataCustomWithProxy } from './scrapeDataCustomWithProxy';
import { CreatorAuth } from '../../generated/graphql';
import { OFCollectionListResponse } from '../../typesStat/fromOF/OFCollectionListResponseData';

export const getCollectionScrapedLists = async (
    creatorAuth: CreatorAuth
): Promise<OFCollectionListResponse> => {
    try {
        const collectionListPath = `${ENDPOINTS_OF.collectionsLists}${FILTERS_OF.collectionsListsLimit}`;
        const collectionListResponse = await scrapeDataCustomWithProxy(
            collectionListPath,
            creatorAuth
        );

        return collectionListResponse;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
