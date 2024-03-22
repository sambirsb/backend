import proxyService from '../services/ProxyService';
import { validateBrightDataProxy } from '../validation/proxyBrightDataValidation';
import { ProxyConfig } from '../typesStat';

export const getProxyConfigByOFUserId = async (
    user_id: string
): Promise<ProxyConfig> => {
    try {
        const proxy = await proxyService.getProxyByOFUserId(user_id);
        if (
            !proxy ||
            !proxy.host ||
            !proxy.port ||
            !proxy.userName ||
            !proxy.password
        ) {
            throw new Error(`Proxy not found for user_id: ${user_id}`);
        }

        await validateBrightDataProxy(proxy);

        return {
            host: proxy.host,
            port: parseInt(proxy.port?.toString()),
            auth: {
                username: proxy.userName,
                password: proxy.password,
            },
        };
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
