import { Document, Types } from 'mongoose';
import { ICreator } from './ICreator';
import { MassMessaging as GraphQLMassMessaging } from '../generated/graphql';

export interface IPopulateMassMessaging
    extends Document,
        Omit<GraphQLMassMessaging, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: ICreator;
    createdBy: Types.ObjectId;
}
