import authService from '../../services/AuthService';
import autoFollowService from '../../services/AutoFollowService';
import { elevateError } from '../../errors/elevateError';
import { ChangeAutoFollowInput } from '../../generated/graphql';

const autoFollowMutationResolver = {
    Mutation: {
        async changeAutoFollow(
            _: never,
            { input }: { input: ChangeAutoFollowInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await autoFollowService.changeAutoFollow(token, input);
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default autoFollowMutationResolver;
