import { Document, Types } from 'mongoose';
import { OFVaultItemType } from '../constants/OFVaultItemType';

export interface IVaultItem extends Document {
    _id: Types.ObjectId;
    user_id: number;
    OF_vaultItem_id: number;
    type: OFVaultItemType;
    name: string;
    hasMedia: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    videosCount: number;
    photosCount: number;
    gifsCount: number;
    audiosCount: number;
    medias: Types.ObjectId[];
}
