import { getCollectionScrapedLists } from '../index';
import { OFCollectionListResponse } from '../../typesStat/fromOF/OFCollectionListResponseData';
import { CollectionList, CreatorAuth } from '../../generated/graphql';

export const getAllCollectionLists = async (
    creatorAuth: CreatorAuth
): Promise<CollectionList[]> => {
    try {
        const collectionListData: OFCollectionListResponse =
            await getCollectionScrapedLists(creatorAuth);
        const customCollectionListData = collectionListData.list.map(
            (item) => ({
                name: item.name,
                id: item.id.toString(),
            })
        );

        return customCollectionListData;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
