import authService from '../../services/AuthService';
import expiringFansMessageService from '../../services/ExpiringFansMessageService';
import { elevateError } from '../../errors/elevateError';

const expiringFansMessageQueryResolver = {
    Query: {
        async getOneExpiringFansMessage(
            _: never,
            { expiringFansMessageId }: { expiringFansMessageId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await expiringFansMessageService.getOneExpiringFansMessage(
                    token,
                    expiringFansMessageId
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getAllExpiringFansMessages(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await expiringFansMessageService.getAllExpiringFansMessages(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default expiringFansMessageQueryResolver;
