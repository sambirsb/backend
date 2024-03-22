import { Document, Types } from 'mongoose';
import { NameType } from '../constants/NameType';
import { Script as GraphQLScript } from '../generated/graphql';

export interface IScript
    extends Document,
        Omit<GraphQLScript, 'id' | 'scriptFolder' | 'customName' | 'fanName'> {
    _id: Types.ObjectId;
    scriptFolder: Types.ObjectId;
    customName: NameType;
    fanName: NameType;
}
