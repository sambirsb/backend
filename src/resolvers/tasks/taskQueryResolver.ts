import authService from '../../services/AuthService';
import taskService from '../../services/TaskService';
import { elevateError } from '../../errors/elevateError';
import { DatesFilterInput, GetMyTeamTasks } from '../../generated/graphql';

const taskQueryResolver = {
    Query: {
        async getAllTasksOwner(
            _: never,
            { input }: { input: DatesFilterInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await taskService.getAllTasksOwner(token, input);
            } catch (err) {
                elevateError(err);
            }
        },

        async getAllPerformers(_: never, __: never, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await taskService.getAllPerformers(token);
            } catch (err) {
                elevateError(err);
            }
        },

        async getMyTasks(
            _: never,
            { input }: { input: DatesFilterInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await taskService.getMyTasks(token, input);
            } catch (err) {
                elevateError(err);
            }
        },

        async getMyTeamTasks(
            _: unknown,
            { input }: { input: GetMyTeamTasks },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await taskService.getMyTeamTasks(token, input);
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default taskQueryResolver;
