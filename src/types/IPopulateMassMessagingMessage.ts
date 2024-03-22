import { Document, Types } from 'mongoose';
import { ICreator, IMMM } from './index';
import { MassMessaging as GraphQLMassMessaging } from '../generated/graphql';

export interface IPopulateMassMessagingMessage
    extends Document,
        Omit<GraphQLMassMessaging, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: ICreator;
    createdBy: Types.ObjectId;
    messages: IMMM[];
}
