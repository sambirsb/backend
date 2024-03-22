import { Document, Types } from 'mongoose';
import { MassMessagingMessage as GraphQLMassMessagingMessage } from '../generated/graphql';

export interface IMMM
    extends Document,
        Omit<GraphQLMassMessagingMessage, 'id' | 'massMess'> {
    _id: Types.ObjectId;
    massMess: Types.ObjectId;
}
