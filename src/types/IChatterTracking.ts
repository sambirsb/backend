import { Document, Types } from 'mongoose';
import { ChatterTracking as GraphQLChatterTracking } from '../generated/graphql';

export interface IChatterTracking
    extends Document,
        Omit<GraphQLChatterTracking, 'id' | 'teamMemberId'> {
    _id: Types.ObjectId;
    teamMemberId: Types.ObjectId;
}
