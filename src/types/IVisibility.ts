import { Document, Types } from 'mongoose';
import { Visibility as GraphQLVisibility } from '../generated/graphql';

interface IVisibility
    extends Document,
        Omit<GraphQLVisibility, 'id' | 'creatorId'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
}

export default IVisibility;
