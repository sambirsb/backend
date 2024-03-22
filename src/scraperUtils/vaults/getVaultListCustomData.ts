import mongoose from 'mongoose';
import vaultService from '../../servicesStat/VaultService';
import { getUserIdFromCreatorAuth } from '../../utils';
import { PopulatedVaultItem, VaultCustomData } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getVaultListCustomDataNoScrap = async (
    creatorAuth: CreatorAuth,
    statConnection: mongoose.Connection
): Promise<VaultCustomData[]> => {
    try {
        const user_id = await getUserIdFromCreatorAuth(creatorAuth);
        const vaultItems = await vaultService.getVaultListCustom(
            user_id,
            statConnection
        );
        return vaultItems.map((item: PopulatedVaultItem) => ({
            id: item.OF_vaultItem_id,
            name: item.name,
            videosCount: item.videosCount,
            photosCount: item.photosCount,
            mediaIds: item.medias.map((media) => media.OF_media.id),
        }));
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
