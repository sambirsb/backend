import authService from '../../services/AuthService';
import creatorService from '../../services/CreatorService';
import { checkCreatorOwner } from '../../utils/creators/checkCreatorOwner';
import { elevateError } from '../../errors/elevateError';

const creatorQueryResolver = {
    Query: {
        async getCreatorAuth(
            _: never,
            { user_id }: { user_id: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await creatorService.getCreatorAuth(token, user_id);
            } catch (err) {
                elevateError(err);
            }
        },

        async getCreatorById(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await checkCreatorOwner(token, creatorId);
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default creatorQueryResolver;
