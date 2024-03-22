import { Document, Types } from 'mongoose';
import { ExpiringFansMessage as GraphQLExpiringFansMessage } from '../generated/graphql';

export interface IExpiringFansMessage
    extends Document,
        Omit<GraphQLExpiringFansMessage, 'id' | 'expiringFans'> {
    _id: Types.ObjectId;
    expiringFans: Types.ObjectId;
}
