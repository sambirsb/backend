import authService from '../../services/AuthService';
import vaultMediaService from '../../services/vaultMediaService';
import { elevateError } from '../../errors/elevateError';

const vaultMediaQueryResolver = {
    Query: {
        async getAllCreatorVaultMedia(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await vaultMediaService.getAllCreatorVaultMedia(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default vaultMediaQueryResolver;
