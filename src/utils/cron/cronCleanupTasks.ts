import cron from 'node-cron';
import TaskModel from '../../models/TaskModel';
import { TaskStatusType } from '../../constants/TaskStatusType';
import { CLEANUP_INTERVAL } from '../../constants/cleanupSettings';
import { elevateError } from '../../errors/elevateError';

export const cleanupOldTasks = async () => {
    cron.schedule(CLEANUP_INTERVAL, async () => {
        try {
            const currentDate = new Date();
            const dateOneYearAgo = new Date(
                currentDate.setFullYear(currentDate.getFullYear() - 1)
            );

            await TaskModel.deleteMany({
                updatedAt: { $lt: dateOneYearAgo },
                status: TaskStatusType.COMPLETED,
            });
        } catch (err) {
            elevateError(err);
        }
    });
};
