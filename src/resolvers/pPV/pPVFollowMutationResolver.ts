import authService from '../../services/AuthService';
import ppvFollowService from '../../services/pPVFollowService';
import { elevateError } from '../../errors/elevateError';
import { IPPVFollow } from '../../types';
import { ChangePpvFollowInput } from '../../generated/graphql';

const PPVFollowMutationResolver = {
    Mutation: {
        async changePPVFollow(
            _: never,
            { input }: { input: ChangePpvFollowInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const pPVFollow = (await ppvFollowService.changePPVFollow(
                    token,
                    input
                )) as IPPVFollow;

                return {
                    message: `PPVFollow with id: ${input.id} was changed successfully.`,
                    pPVFollow,
                };
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default PPVFollowMutationResolver;
