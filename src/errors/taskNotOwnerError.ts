import { ITask } from '../types';

export const taskNotOwnerError = async (tasksNotOwned: ITask[]) => {
    if (tasksNotOwned.length > 0) {
        const notOwnedTaskIds = tasksNotOwned.map((task) =>
            task._id.toString()
        );
        throw new Error(
            `You do not own tasks with the following IDs: ${notOwnedTaskIds.join(
                ', '
            )}`
        );
    }
};
