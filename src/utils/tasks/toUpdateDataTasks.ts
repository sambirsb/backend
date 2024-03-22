import { UpdateTasksDBInput } from '../../types/taskTypes';
import { ChangeTaskInput } from '../../generated/graphql';

export const toUpdateDataTasks = (
    input: ChangeTaskInput
): UpdateTasksDBInput => {
    const updateData: Partial<UpdateTasksDBInput> = {};
    const fieldsToUpdate: (keyof ChangeTaskInput)[] = [
        'title',
        'note',
        'startDate',
        'endDate',
        'status',
    ];

    fieldsToUpdate.forEach((field) => {
        const value = input[field];
        if (value != null) {
            updateData[field as keyof UpdateTasksDBInput] = value as any;
        }
    });

    return updateData as UpdateTasksDBInput;
};
