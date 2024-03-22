import authService from '../../services/AuthService';
import userService from '../../services/UserService';
import { elevateError } from '../../errors/elevateError';

const queryResolvers = {
    Query: {
        async getUserByToken(_: never, __: unknown, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const result =
                    await userService.getUserByTokenWithCreators(token);

                if (!result) {
                    throw new Error('User not found');
                }

                const { user, teams, newToken } = result;

                return {
                    user,
                    teams,
                    token: newToken,
                };
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default queryResolvers;
