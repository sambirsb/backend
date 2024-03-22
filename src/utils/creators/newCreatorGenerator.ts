import CreatorModel from '../../models/CreatorModel';
import proxyService from '../../services/ProxyService';
import {
    toAddCreatorResp,
    addOtherRelatedEntities,
    checkCreatorAuthUserIdExists,
    checkLinkExists,
} from '../';
import { IProxy } from '../../types';
import {
    AddCreatorExtensionInput,
    CreatorForAddCreatorResponse,
} from '../../generated/graphql';

export async function newCreatorGenerator(
    userId: string,
    input: AddCreatorExtensionInput
): Promise<CreatorForAddCreatorResponse> {
    try {
        const { link, userName, avatarURL, joinDate, user_id } = input;

        await checkLinkExists(userId, link);
        await checkCreatorAuthUserIdExists(user_id);

        const creator = await CreatorModel.create({
            link,
            userId,
            userName,
            avatarURL,
            joinDate,
            creatorAuth: {
                user_id,
            },
        });

        await addOtherRelatedEntities(creator.id, userId);

        const proxy = (await proxyService.chooseAUTOProxyDefault(
            creator.id
        )) as IProxy;

        return toAddCreatorResp(creator, proxy);
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}
