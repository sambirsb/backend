import mongoose, { Schema } from 'mongoose';
import { IVaultItem } from '../typesStat/IVaultItem';
import { OFVaultItemType } from '../constants/OFVaultItemType';

const vaultItemModel = new Schema<IVaultItem>(
    {
        user_id: {
            type: mongoose.Schema.Types.Number,
            ref: 'public_data',
            required: true,
        },
        OF_vaultItem_id: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(OFVaultItemType),
            required: true,
        },
        name: String,
        hasMedia: Boolean,
        canUpdate: Boolean,
        canDelete: Boolean,
        videosCount: Number,
        photosCount: Number,
        gifsCount: Number,
        audiosCount: Number,
        medias: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'media',
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'vault_items',
    }
);

const VaultItemModel = (connection: mongoose.Connection) => {
    return connection.model('vault_items', vaultItemModel);
};

export default VaultItemModel;
