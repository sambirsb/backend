import { Document, Types } from 'mongoose';
import { VaultMedia as GraphQLVaultMedia } from '../generated/graphql';

export interface IVaultMedia
    extends Document,
        Omit<
            GraphQLVaultMedia,
            'id' | 'creatorId' | 'scriptId' | 'createdBy' | 'media_id'
        > {
    _id: Types.ObjectId;
    media_id: string;
    creatorId: Types.ObjectId;
    scriptId: Types.ObjectId;
    createdBy: Types.ObjectId;
}
