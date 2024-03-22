import { Document, Types } from 'mongoose';
import { PpvFollow as GraphQLPpvFollow } from '../generated/graphql';

export interface IPPVFollow
    extends Document,
        Omit<GraphQLPpvFollow, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
    createdBy: Types.ObjectId;
}
