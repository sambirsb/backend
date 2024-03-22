import authService from '../../services/AuthService';
import expiringFansService from '../../services/ExpiringFansService';
import { elevateError } from '../../errors/elevateError';
import { ChangeExpiringFansInput } from '../../generated/graphql';

const expiringFansMutationResolver = {
    Mutation: {
        async changeExpiringFans(
            _: never,
            { input }: { input: ChangeExpiringFansInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const expiringFans =
                    await expiringFansService.changeExpiringFans(token, input);

                return {
                    message: 'Expiring fans changed successfully',
                    expiringFans,
                };
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default expiringFansMutationResolver;
