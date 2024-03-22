import { API_BASE_OF, FILTERS_OF } from '../../constants/apiEndpointsOF';
import { scrapeDataCustomWithProxy } from './scrapeDataCustomWithProxy';
import { CreatorAuth } from '../../generated/graphql';

export const getExpiredOneFansList = async (
    creatorAuth: CreatorAuth,
    expiredCollectionId: string
) => {
    try {
        const expiredFansListPath = `${API_BASE_OF}/lists/${expiredCollectionId}/users${FILTERS_OF.oneListLimit}`;

        return await scrapeDataCustomWithProxy(
            expiredFansListPath,
            creatorAuth
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
