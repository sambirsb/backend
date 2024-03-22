import axios from 'axios';
import { createHeaders, getRules } from '../scraperConfigUtils';
import { getProxyConfigByOFUserId } from '../getProxyConfigByOFUserId';
import { CreatorAuth } from '../../generated/graphql';

export const getAxiosInstWithHeaders = async (
    path: string,
    creatorAuth: CreatorAuth
) => {
    try {
        const user_id = creatorAuth.user_id;

        if (!user_id) {
            throw new Error('User_id is undefined');
        }

        const proxyConfig = await getProxyConfigByOFUserId(user_id);
        const axiosInstance = axios.create({ proxy: proxyConfig });

        const auth = {
            'user-agent': creatorAuth.user_agent || '',
            'x-bc': creatorAuth.x_bc || '',
            'user-id': user_id,
            cookie: creatorAuth.cookie || '',
        };

        const rules = {
            ...(await getRules()),
            ...auth,
        };

        const headers = createHeaders(path, rules);

        return { axiosInstance, headers };
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
