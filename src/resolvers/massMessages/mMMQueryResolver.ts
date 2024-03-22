import authService from '../../services/AuthService';
import mMMService from '../../services/MMMService';
import { elevateError } from '../../errors/elevateError';

const mMMQueryResolver = {
    Query: {
        async getAllMessages(
            _: never,
            { massMessId }: { massMessId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await mMMService.getAllMessages(token, massMessId);
            } catch (err) {
                elevateError(err);
            }
        },

        async getOneMassMessage(
            _: never,
            { massMessageId }: { massMessageId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await mMMService.getOneMassMessage(token, massMessageId);
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default mMMQueryResolver;
