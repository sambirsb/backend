import { ITask } from '../../types';

export const checkExistingTasksInDB = async (
    tasks: ITask[],
    taskIds: string[]
) => {
    const foundIds = tasks.map((task) => task._id.toString());

    const missingIds = taskIds.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
        throw new Error(
            `Tasks with the following IDs were not found: ${missingIds.join(
                ', '
            )}`
        );
    }
};
