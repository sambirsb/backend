import { ICreator, IProxy } from '../../types';
import { CreatorForAddCreatorResponse } from '../../generated/graphql';

export const toAddCreatorResp = (
    creator: ICreator,
    proxy: IProxy
): CreatorForAddCreatorResponse => {
    return {
        id: creator.id,
        link: creator.link,
        userId: creator.userId.toString(),
        license: creator.license,
        userName: creator.userName,
        avatarURL: creator.avatarURL,
        joinDate: creator.joinDate,
        creatorAuth: creator.creatorAuth,
        proxy: {
            id: proxy.id,
            proxyType: proxy.proxyType as any,
            host: proxy.host,
            port: proxy.port,
            userName: proxy.userName,
            password: proxy.password,
            country: proxy.zone?.country as any,
        },
    };
};
