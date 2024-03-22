import { Document, Types } from 'mongoose';
import { ProxyType } from '../constants/proxyType';
import { Proxy as GraphQLProxy } from '../generated/graphql';

export interface IProxy
    extends Document,
        Omit<GraphQLProxy, 'id' | 'creatorId' | 'proxyType'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
    proxyType: ProxyType;
}
