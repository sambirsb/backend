import { ENDPOINTS_OF } from '../../constants/apiEndpointsOF';
import { delay } from '../';
import { postDataCustom, postDataCustomWithProxy } from '../../scraperUtils';
import { ProxyConfig } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const saveToNewSubsList = async (
    new_message: any,
    creator: any,
    proxy: ProxyConfig
) => {
    const collectionListId = creator.collectionListId;
    await delay(600);

    const data = {
        [collectionListId]: [new_message.user.id],
    };

    if (proxy) {
        await postDataCustomWithProxy(
            `${ENDPOINTS_OF.listsUsers}`,
            creator.creatorAuth as CreatorAuth,
            data
        );
    } else {
        await postDataCustom(
            `${ENDPOINTS_OF.listsUsers}`,
            creator.creatorAuth as CreatorAuth,
            data
        );
    }
};
