import { Types } from 'mongoose';
import { ITask } from '../../types';

export const getDataAfterUpdate = (
    taskFromDB: ITask,
    perfIdsForCreateTasks: string[]
) => {
    return perfIdsForCreateTasks.map((performerId) => ({
        ownerId: taskFromDB.ownerId,
        performerId: new Types.ObjectId(performerId),
        title: taskFromDB.title,
        note: taskFromDB.note,
        startDate: taskFromDB.startDate,
        endDate: taskFromDB.endDate,
        status: taskFromDB.status,
    }));
};
