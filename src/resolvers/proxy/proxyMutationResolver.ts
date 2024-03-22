import authService from '../../services/AuthService';
import proxyService from '../../services/ProxyService';
import { elevateError } from '../../errors/elevateError';
import {
    ChooseAutoProxyInput,
    ChooseHttpProxyInput,
    EnabledRegionProxy,
} from '../../generated/graphql';

const proxyMutationResolver = {
    Mutation: {
        async chooseHTTPProxy(
            _: never,
            { input }: { input: ChooseHttpProxyInput },
            context: any
        ) {
            const token = authService.checkToken(context.token);

            try {
                const proxy = await proxyService.chooseHTTPProxy(token, input);

                if (!proxy) {
                    throw new Error('Proxy not found');
                }

                return {
                    message: `Proxy for creator with id: ${proxy.creatorId} successfully created`,
                    proxy,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async chooseAUTOProxy(
            _: never,
            { input }: { input: ChooseAutoProxyInput },
            context: any
        ) {
            const token = authService.checkToken(context.token);

            try {
                const proxy = await proxyService.chooseAUTOProxy(token, input);

                return {
                    message: `Proxy for creator with id: ${input.creatorId} successfully added`,
                    proxy,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async addAUTOProxy(
            _: never,
            { country }: { country: EnabledRegionProxy },
            context: any
        ) {
            const token = authService.checkToken(context.token);

            try {
                const proxy = (await proxyService.addAUTOProxyByAdmin(
                    token,
                    country
                )) as any;

                if (!proxy) {
                    throw new Error('Proxy not found');
                }

                return {
                    message: `Proxy for creator with id: ${proxy.creatorId} successfully created`,
                    proxy,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async deleteAUTOProxy(
            _: never,
            { proxyId }: { proxyId: string },
            context: any
        ) {
            const token = authService.checkToken(context.token);

            try {
                await proxyService.deleteAUTOProxy(token, proxyId);

                return `Proxy with id: ${proxyId} successfully deleted`;
            } catch (err) {
                elevateError(err);
            }
        },

        async checkProxyIp(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await proxyService.checkProxyIp(token, creatorId);
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default proxyMutationResolver;
