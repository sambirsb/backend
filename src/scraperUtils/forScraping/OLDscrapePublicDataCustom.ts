import axios from 'axios';
import { ONLYFANS_URL } from '../../constants/apiEndpointsOF';
import { createHeaders, getRules } from '../scraperConfigUtils';
import { validateBrightDataProxy } from '../../validation/proxyBrightDataValidation';
import { IProxy } from '../../types';
import { OFPublicResponseData } from '../../typesStat/fromOF/OFPublicResponseData';
import { CreatorAuth } from '../../generated/graphql';

export const OLDscrapePublicDataCustom = async (
    path: string,
    creatorAuth: CreatorAuth
): Promise<OFPublicResponseData> => {
    try {
        const proxy = {
            host: '' /* config.BRIGHT_DATA_PROXY.host */, //removed
            port: '' /* config.BRIGHT_DATA_PROXY.port */, //removed
            userName: '' /* config.BRIGHT_DATA_PROXY.userName */, //removed
            password: '' /* config.BRIGHT_DATA_PROXY.password */, //removed
        } as IProxy;

        if (
            !proxy ||
            !proxy.host ||
            !proxy.port ||
            !proxy.userName ||
            !proxy.password
        ) {
            throw new Error('Proxy is undefined');
        }

        await validateBrightDataProxy(proxy);

        const proxyConfig = {
            host: proxy.host,
            port: parseInt(proxy.port.toString()),
            auth: {
                username: proxy.userName,
                password: proxy.password,
            },
        };

        const axiosInstance = axios.create({ proxy: proxyConfig });

        const auth = {
            'user-agent': creatorAuth.user_agent || '',
            'x-bc': creatorAuth.x_bc || '',
            'user-id': creatorAuth.user_id,
            cookie: creatorAuth.cookie || '',
        };

        const rules = {
            ...(await getRules()),
            ...auth,
        };

        const headers = createHeaders(path, rules);

        const res = await axiosInstance.get(`${ONLYFANS_URL}${path}`, {
            headers,
        });

        if (!res || !res.data) {
            throw new Error(`Response data is undefined for the path: ${path}`);
        }

        return res.data;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
