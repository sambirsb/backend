import { Connection } from 'mongoose';
import mediaService from '../../servicesStat/MediaService';
import vaultService from '../../servicesStat/VaultService';
import { getVaultListScrapedData, getVaultCustomMediaData } from '../index';
import { getUserIdFromCreatorAuth } from '../../utils';
import { elevateError } from '../../errors/elevateError';
import { OFVaultListResponse } from '../../typesStat';
import { ICreator } from '../../types';

export const updateVaultWithMedia = async (
    creator: ICreator,
    statConnection: Connection
) => {
    try {
        if (!creator.creatorAuth) {
            throw new Error('CreatorAuth is undefined');
        }

        const user_id = await getUserIdFromCreatorAuth(creator.creatorAuth);
        const vaultListData: OFVaultListResponse =
            await getVaultListScrapedData(creator.creatorAuth);

        if (!vaultListData) return;

        for (const vaultItem of vaultListData.list) {
            const vaultMediaData = await getVaultCustomMediaData(
                vaultItem.id.toString(),
                creator.creatorAuth
            );

            const savedMedias = await mediaService.updateMedia(
                vaultMediaData.list,
                user_id,
                statConnection
            );
            const mediaIds = savedMedias.map((media) => media._id);

            await vaultService.updateVaultItem(
                vaultItem,
                mediaIds,
                user_id,
                statConnection
            );
        }
    } catch (err) {
        elevateError(err);
    }
};
