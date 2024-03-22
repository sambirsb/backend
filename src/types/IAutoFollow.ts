import { Document, Types } from 'mongoose';
import { AutoFollow as GraphQLAutoFollow } from '../generated/graphql';

export interface IAutoFollow
    extends Document,
        Omit<GraphQLAutoFollow, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
    createdBy: Types.ObjectId;
}
