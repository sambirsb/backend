import { Document, Types } from 'mongoose';
import { DisplaySettings as GraphQLDisplaySettings } from '../generated/graphql';
export interface IDisplaySettings
    extends Document,
        Omit<GraphQLDisplaySettings, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
    createdBy: Types.ObjectId;
}
