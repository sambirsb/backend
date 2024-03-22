import authService from '../../services/AuthService';
import visibilityService from '../../services/VisibilityService';
import { elevateError } from '../../errors/elevateError';
import { VisibilityInput } from '../../generated/graphql';

const visibilityMutationResolver = {
    Mutation: {
        async changeCreatorVisibility(
            _: unknown,
            { input }: { input: VisibilityInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const visibility = await visibilityService.changeVisibility(
                    token,
                    input
                );

                if (!visibility) {
                    throw new Error('Failed to change visibility.');
                }

                return {
                    message: 'Visibility successfully changed',
                    visibility,
                };
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default visibilityMutationResolver;
