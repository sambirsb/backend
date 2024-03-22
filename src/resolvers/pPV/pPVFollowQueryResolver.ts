import authService from '../../services/AuthService';
import ppvFollowService from '../../services/pPVFollowService';
import { elevateError } from '../../errors/elevateError';

const PPVFollowQueryResolver = {
    Query: {
        async getPPVFollow(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await ppvFollowService.getPPVFollowByCreatorId(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default PPVFollowQueryResolver;
