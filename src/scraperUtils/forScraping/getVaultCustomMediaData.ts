import { ENDPOINTS_OF, FILTERS_OF } from '../../constants/apiEndpointsOF';
import { scrapeDataCustomWithProxy } from './scrapeDataCustomWithProxy';
import { OFVaultCustomMediaResponse } from '../../typesStat/fromOF/OFVaultCustomMediaResponseData';
import { CreatorAuth } from '../../generated/graphql';

export const getVaultCustomMediaData = async (
    vaultItemId: string,
    creatorAuth: CreatorAuth
): Promise<OFVaultCustomMediaResponse> => {
    try {
        const vaultMediaPath = `${ENDPOINTS_OF.vaultCustomMedia}${FILTERS_OF.vaultMediaLimit}${vaultItemId}`;

        return await scrapeDataCustomWithProxy(vaultMediaPath, creatorAuth);
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
