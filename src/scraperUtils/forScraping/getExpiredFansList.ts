import { DELAY_NUMBER } from '../../constants/delay';
import { regexExpired } from '../../constants/regex';
import { getCollectionScrapedLists } from './getCollectionScrapedLists';
import { getExpiredOneFansList } from './getExpiredOneFansList';
import { delay } from '../../utils';
import { CreatorAuth } from '../../generated/graphql';

export const getExpiredFansList = async (creatorAuth: CreatorAuth) => {
    try {
        const allLists = await getCollectionScrapedLists(creatorAuth);

        const expiredCollectionId = findExpiredFansId(allLists.list);

        await delay(DELAY_NUMBER);

        if (expiredCollectionId) {
            return await getExpiredOneFansList(
                creatorAuth,
                expiredCollectionId
            );
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const findExpiredFansId = (list: any) => {
    for (const item of list) {
        if (regexExpired.test(item.name.replace(/\d+/g, ''))) {
            return item.id;
        }
    }

    return null;
};
