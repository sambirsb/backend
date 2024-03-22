import { ENDPOINTS_OF } from '../../constants/apiEndpointsOF';
import { scrapeDataCustomWithProxy } from './scrapeDataCustomWithProxy';
import { OFVaultItem } from '../../typesStat/fromOF/OFVaultListResponseData';
import { CreatorAuth } from '../../generated/graphql';

export const getOneVaultScrapedData = async (
    vaultId: string,
    creatorAuth: CreatorAuth
): Promise<OFVaultItem> => {
    try {
        const oneVaultPath = `${ENDPOINTS_OF.vaultLists}/${vaultId}`;
        const oneVaultResponse = await scrapeDataCustomWithProxy(
            oneVaultPath,
            creatorAuth
        );

        return oneVaultResponse.data;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
