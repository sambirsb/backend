import axios from 'axios';
import { IProxy } from '../../types';

export const checkIPWithProxy = async (proxy: IProxy): Promise<string> => {
    try {
        //TODO replace it to validation YUP
        if (!proxy.host || !proxy.userName || !proxy.password) {
            throw new Error('Proxy configuration is incomplete.');
        }

        const proxyConfig = {
            host: proxy.host,
            port: parseInt(proxy.port || '80'),
            auth: {
                username: proxy.userName,
                password: proxy.password,
            },
        };

        const axiosInstance = axios.create({ proxy: proxyConfig });

        const response = await axiosInstance.get('https://httpbin.org/ip');
        console.log(response.data);

        return response.data.origin;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
