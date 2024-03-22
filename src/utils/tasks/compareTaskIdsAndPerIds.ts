import { ITask } from '../../types';

export const compareTaskIdsAndPerIds = (
    existingTasks: ITask[],
    performerIds: string[]
) => {
    const existingPerformerIds = existingTasks.map((task) =>
        task.performerId.toString()
    );
    const perfIdsForCreateTasks = performerIds.filter(
        (performerId) => !existingPerformerIds.includes(performerId)
    );
    const taskIdsForDelete = existingTasks
        .filter((task) => !performerIds.includes(task.performerId.toString()))
        .map((task) => task.id);
    const taskIdsForUpdate = existingTasks
        .filter((task) => performerIds.includes(task.performerId.toString()))
        .map((task) => task.id);

    return {
        perfIdsForCreateTasks,
        taskIdsForDelete,
        taskIdsForUpdate,
    };
};
