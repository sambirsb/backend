import { Document, Types } from 'mongoose';
import { DisplayColor as GraphQLDisplayColor } from '../generated/graphql';

export interface IDisplayColors
    extends Document,
        Omit<GraphQLDisplayColor, 'id' | 'welcomeSettings'> {
    _id: Types.ObjectId;
    displaySettings: Types.ObjectId;
}
