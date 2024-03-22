import { Document, Types } from 'mongoose';
import { IProxy } from './IProxy';
import { Creator as GraphQLCreator } from '../generated/graphql';

export interface ICreator
    extends Document,
        Omit<GraphQLCreator, 'id' | 'userId'> {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    lastUpdatedDate: Date;
}

export interface ICreatorsProxy
    extends Document,
        Omit<GraphQLCreator, 'id' | 'userId'> {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    lastUpdatedDate: Date;
    proxy: IProxy;
}
