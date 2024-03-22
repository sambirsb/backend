import authService from '../../services/AuthService';
import autoFollowService from '../../services/AutoFollowService';
import { elevateError } from '../../errors/elevateError';

const autoFollowQueryResolver = {
    Query: {
        async getAutoFollow(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                return await autoFollowService.getAFByCreatorId(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default autoFollowQueryResolver;
