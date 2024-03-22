import authService from '../../services/AuthService';
import proxyService from '../../services/ProxyService';
import { elevateError } from '../../errors/elevateError';

const proxyQueryResolver = {
    Query: {
        async getCreatorProxy(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await proxyService.getCreatorProxyWithRemove(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getUserCreatorsProxy(_: never, __: unknown, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await proxyService.getUserCreatorsProxyWithPublicData(
                    token,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getAvailableCountries() {
            try {
                return await proxyService.getAvailableCountries();
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default proxyQueryResolver;
