import authService from '../../services/AuthService';
import massMessagingService from '../../services/MassMessagingService';
import { elevateError } from '../../errors/elevateError';

const massMessagingQueryResolver = {
    Query: {
        async getAllMassMessaging(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await massMessagingService.getAllMassMessaging(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getOneMassMessaging(
            _: never,
            { massMessagingId }: { massMessagingId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await massMessagingService.getOneMassMessaging(
                    token,
                    massMessagingId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default massMessagingQueryResolver;
