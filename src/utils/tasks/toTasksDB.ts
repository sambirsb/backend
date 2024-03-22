import { CreateTaskInput } from '../../generated/graphql';

export const toTasksDB = (ownerId: string, input: CreateTaskInput) => {
    const startDate = input.startDate ? input.startDate : new Date();

    return input.performerIds.map((performerId) => ({
        ownerId,
        performerId,
        title: input.title,
        note: input.note,
        startDate,
        endDate: input.endDate,
        status: input.status,
    }));
};
