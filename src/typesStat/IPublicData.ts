import { Document } from 'mongoose';
import { PublicData as GraphQLPublicData } from '../generated/graphql';

export interface IPublicData
    extends Document,
        Omit<GraphQLPublicData, 'pathId' | '_id'> {
    _id: number;
    pathId: string;
}
