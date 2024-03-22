import authService from '../../services/AuthService';
import ppvMessageService from '../../services/pPVMessageService';
import { elevateError } from '../../errors/elevateError';

const pPVMessageQueryResolver = {
    Query: {
        async getOnePPVMessage(
            _: never,
            { pPVMessageId }: { pPVMessageId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await ppvMessageService.getOnePPVMessage(
                    token,
                    pPVMessageId
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getAllPPVMessage(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await ppvMessageService.getAllPPVMessage(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default pPVMessageQueryResolver;
