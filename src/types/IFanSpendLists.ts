import { Document, Types } from 'mongoose';
import { FanSpendLists as GraphQLFanSpendLists } from '../generated/graphql';

interface IFanSpendLists
    extends Document,
        Omit<GraphQLFanSpendLists, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
    createdBy: Types.ObjectId;
}

export default IFanSpendLists;
