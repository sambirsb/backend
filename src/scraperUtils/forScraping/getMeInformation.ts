import { ENDPOINTS_OF } from '../../constants/apiEndpointsOF';
import { scrapeDataCustomWithProxy } from './scrapeDataCustomWithProxy';
import { CreatorAuth } from '../../generated/graphql';

export const getMeInformation = async (creatorAuth: CreatorAuth) => {
    try {
        const mePath = `${ENDPOINTS_OF.me}`;
        return await scrapeDataCustomWithProxy(mePath, creatorAuth);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
