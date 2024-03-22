import authService from '../../services/AuthService';
import taskService from '../../services/TaskService';
import { elevateError } from '../../errors/elevateError';
import {
    ChangeTaskInput,
    ChangeTaskStatusInput,
    CreateTaskInput,
} from '../../generated/graphql';

const taskMutationResolver = {
    Mutation: {
        async createTask(
            _: unknown,
            { input }: { input: CreateTaskInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await taskService.createTasks(token, input);
            } catch (err) {
                elevateError(err);
            }
        },

        async changeTask(
            _: unknown,
            { input }: { input: ChangeTaskInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await taskService.changeTasks(token, input);
            } catch (err) {
                elevateError(err);
            }
        },

        async changeTaskStatus(
            _: unknown,
            { input }: { input: ChangeTaskStatusInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await taskService.changeTaskStatus(token, input);
            } catch (err) {
                elevateError(err);
            }
        },

        async deleteTask(
            _: unknown,
            { taskIds }: { taskIds: string[] },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await taskService.deleteTasks(token, taskIds);
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default taskMutationResolver;
