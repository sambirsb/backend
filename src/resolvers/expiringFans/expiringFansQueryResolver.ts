import authService from '../../services/AuthService';
import expiringFansService from '../../services/ExpiringFansService';
import { elevateError } from '../../errors/elevateError';

const expiringFansQueryResolver = {
    Query: {
        async getExpiringFans(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await expiringFansService.getEFByCreatorId(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default expiringFansQueryResolver;
