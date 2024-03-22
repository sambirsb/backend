import authService from '../../services/AuthService';
import fanNumberingService from '../../services/FanNumberingService';
import { elevateError } from '../../errors/elevateError';

const fanNumberingQueryResolver = {
    Query: {
        async getFanNumbering(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                return await fanNumberingService.getFNByCreatorId(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default fanNumberingQueryResolver;
