import authService from '../../services/AuthService';
import teamService from '../../services/TeamService';
import { elevateError } from '../../errors/elevateError';

const teamQueryResolver = {
    Query: {
        async getMyTeamMembers(_: never, __: unknown, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await teamService.getAllMembersByToken(token);
            } catch (err) {
                elevateError(err);
            }
        },

        async getMyTeam(_: never, __: unknown, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await teamService.getMyTeamPopulatedByToken(token);
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default teamQueryResolver;
