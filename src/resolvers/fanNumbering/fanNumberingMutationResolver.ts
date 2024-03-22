import authService from '../../services/AuthService';
import fanNumberingService from '../../services/FanNumberingService';
import { elevateError } from '../../errors/elevateError';
import { ChangeFanNumberingInput } from '../../generated/graphql';

const fanNumberingMutationResolver = {
    Mutation: {
        async changeFanNumbering(
            _: never,
            { input }: { input: ChangeFanNumberingInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                return await fanNumberingService.changeFanNumbering(
                    token,
                    input
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default fanNumberingMutationResolver;
