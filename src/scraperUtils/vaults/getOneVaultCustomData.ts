import mongoose from 'mongoose';
import vaultService from '../../servicesStat/VaultService';
import { getVaultCustomMediaData, getOneVaultScrapedData } from '../index';
import { VaultCustomData } from '../../typesStat/VaultTypes';
import { CreatorAuth } from '../../generated/graphql';

export const getOneVaultCustomData = async (
    vaultId: string,
    creatorAuth: CreatorAuth
): Promise<VaultCustomData> => {
    try {
        const oneVaultRespData = await getOneVaultScrapedData(
            vaultId,
            creatorAuth
        );
        const vaultCustomMediaData = await getVaultCustomMediaData(
            vaultId,
            creatorAuth
        );

        const mediaIds = vaultCustomMediaData.list.map((media) => media.id);

        return {
            id: Number(vaultId),
            name: oneVaultRespData.name,
            videosCount: oneVaultRespData.videosCount,
            photosCount: oneVaultRespData.photosCount,
            mediaIds: mediaIds,
        };
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};

export const getOneVaultCustomDataNoScrap = async (
    vaultId: string,
    creatorAuth: CreatorAuth,
    statConnection: mongoose.Connection
) => {
    try {
        const oneVaultData = (await vaultService.getVaultItem(
            vaultId,
            statConnection
        )) as any;

        return {
            id: Number(vaultId),
            name: oneVaultData.name,
            videosCount: oneVaultData.videosCount,
            photosCount: oneVaultData.photosCount,
            mediaIds: oneVaultData.mediaIds,
        };
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
