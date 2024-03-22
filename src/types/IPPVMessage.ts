import { Document, Types } from 'mongoose';
import { PpvMessage as GraphQLPpvMessage } from '../generated/graphql';

interface IPPVMessage
    extends Document,
        Omit<GraphQLPpvMessage, 'id' | 'creatorId'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
}

export default IPPVMessage;
