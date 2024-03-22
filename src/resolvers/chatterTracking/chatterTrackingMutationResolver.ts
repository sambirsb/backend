import authService from '../../services/AuthService';
import chatterTrackingService from '../../servicesStat/ChatterTrackingService';
import { elevateError } from '../../errors/elevateError';
import { ChangeChatterTrackingInput } from '../../generated/graphql';

const chatterTrackingMutationResolver = {
    Mutation: {
        async changeChatterTrackingApp(
            _: unknown,
            { input }: { input: ChangeChatterTrackingInput },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                return await chatterTrackingService.changeChatterTrackingApp(
                    input,
                    token,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
                throw new Error('Error updating chatter tracking.');
            }
        },
    },
};

export default chatterTrackingMutationResolver;
