import { Document, Types } from 'mongoose';
import { CreatorAuth as GraphQLCreatorAuth } from '../generated/graphql';

interface ICreatorAuth
    extends Document,
        Omit<GraphQLCreatorAuth, 'id' | 'creatorId'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
}

export default ICreatorAuth;
