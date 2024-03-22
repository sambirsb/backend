import { model, Model, Schema } from 'mongoose';
import { TaskStatusType } from '../constants/TaskStatusType';
import { ITask } from '../types';

const taskModel: Schema = new Schema<ITask>(
    {
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'TeamMember',
            required: true,
        },
        performerId: {
            type: Schema.Types.ObjectId,
            ref: 'TeamMember',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        note: String,
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(TaskStatusType),
            default: TaskStatusType.NOT_COMPLETED,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

taskModel.virtual('performer', {
    ref: 'TeamMember',
    localField: 'performerId',
    foreignField: '_id',
    justOne: true,
});

const TaskModel = model<ITask, Model<ITask>>('Task', taskModel);
export default TaskModel;
