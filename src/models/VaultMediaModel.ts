import mongoose, { Schema } from 'mongoose';
import { IVaultMedia } from '../types';

const vaultMediaModel: Schema = new Schema<IVaultMedia>(
    {
        media_id: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: 'Creator',
            required: true,
        },
        scriptId: {
            type: Schema.Types.ObjectId,
            ref: 'Script',
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'vaultMedia',
    }
);

const VaultMediaModel = mongoose.model<
    IVaultMedia,
    mongoose.Model<IVaultMedia>
>('VaultMedia', vaultMediaModel);
export default VaultMediaModel;
