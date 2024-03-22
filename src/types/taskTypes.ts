import { TaskStatusType } from '../constants/TaskStatusType';

interface UpdateTasksDBInput {
    title: string;
    note: string;
    startDate: Date;
    endDate: Date;
    status: TaskStatusType;
}

export type { UpdateTasksDBInput };
