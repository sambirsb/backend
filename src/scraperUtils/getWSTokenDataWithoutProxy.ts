import { ENDPOINTS_OF } from '../constants/apiEndpointsOF';
import { scrapeDataCustomWithoutProxy } from './index';
import { CreatorAuth } from '../generated/graphql';

export const getWSTokenDataWithoutProxy = async (
    creatorAuth: CreatorAuth
): Promise<string> => {
    const mePath = `${ENDPOINTS_OF.me}`;
    const subscriptionLatestResponse = await scrapeDataCustomWithoutProxy(
        mePath,
        creatorAuth
    );

    return subscriptionLatestResponse.data.wsAuthToken;
};
