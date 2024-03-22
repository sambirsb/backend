import mongoose, { Types } from 'mongoose';
import VaultItemModel from '../modelsStat/VaultItemModel';
import MediaModel from '../modelsStat/MediaModel';
import { OFVaultItemType } from '../constants/OFVaultItemType';
import { OFVaultItem } from '../typesStat/fromOF/OFVaultListResponseData';
import { IVaultItem } from '../typesStat/IVaultItem';
import { PopulatedVaultItem } from '../typesStat/VaultTypes';

class VaultService {
    async getVaultListCustom(
        user_id: string,
        statConnection: mongoose.Connection
    ): Promise<PopulatedVaultItem[]> {
        try {
            const VaultItemModelObj = VaultItemModel(statConnection);
            const MediaModelObj = MediaModel(statConnection);

            const items = (await VaultItemModelObj.find({
                user_id,
                type: OFVaultItemType.Custom,
            }).populate({
                path: 'medias',
                model: MediaModelObj,
                select: 'OF_media.id',
            })) as any[];

            return items.map((item) => ({
                ...item.toObject(),
                medias: item.medias.map(
                    (media: { OF_media: { id: number } }) => ({
                        OF_media: { id: media.OF_media.id },
                    })
                ),
            })) as PopulatedVaultItem[];
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async updateVaultItem(
        data: OFVaultItem,
        medias: Types.ObjectId[],
        user_id: string,
        statConnection: mongoose.Connection
    ) {
        try {
            const VaultItemModelObj = VaultItemModel(statConnection);

            const vaultItem = {
                user_id: Number(user_id),
                OF_vaultItem_id: data.id,
                type: data.type,
                name: data.name,
                hasMedia: data.hasMedia,
                canUpdate: data.canUpdate,
                canDelete: data.canDelete,
                videosCount: data.videosCount,
                photosCount: data.photosCount,
                gifsCount: data.gifsCount,
                audiosCount: data.audiosCount,
                medias,
            };

            const updatedVaultItem = (await VaultItemModelObj.findOneAndUpdate(
                {
                    user_id: vaultItem.user_id,
                    OF_vaultItem_id: vaultItem.OF_vaultItem_id,
                },
                vaultItem,
                {
                    new: true,
                    upsert: true,
                } as mongoose.QueryOptions
            )) as IVaultItem;

            if (!updatedVaultItem) {
                await VaultItemModelObj.create(vaultItem);
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getVaultItem(
        vaultItemId: string,
        statConnection: mongoose.Connection
    ) {
        try {
            const VaultItemModelObj = VaultItemModel(statConnection);
            const item: any = await VaultItemModelObj.findOne({
                OF_vaultItem_id: vaultItemId,
            }).populate({
                path: 'medias',
                model: MediaModel(statConnection),
                select: 'OF_media.id',
            });

            return {
                id: item.OF_vaultItem_id,
                type: item.type,
                name: item.name,
                hasMedia: item.hasMedia,
                canUpdate: item.canUpdate,
                canDelete: item.canDelete,
                videosCount: item.videosCount,
                photosCount: item.photosCount,
                gifsCount: item.gifsCount,
                audiosCount: item.audiosCount,
                mediaIds: item.medias.map((media: any) => media.OF_media.id),
            };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

const vaultService = new VaultService();
export default vaultService;
