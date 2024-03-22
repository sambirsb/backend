import { Document, Types } from 'mongoose';
import { TaskStatusType } from '../constants/TaskStatusType';
import { Task as GraphQLTask } from '../generated/graphql';

export interface ITask
    extends Document,
        Omit<GraphQLTask, 'id' | 'ownerId' | 'performerId' | 'status'> {
    _id: Types.ObjectId;
    ownerId: Types.ObjectId;
    performerId: Types.ObjectId;
    status: TaskStatusType;
}
