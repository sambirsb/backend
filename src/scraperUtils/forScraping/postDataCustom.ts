import axios from 'axios';
import { config } from '../../constants/config/env';
import { createHeaders, getRules } from '../scraperConfigUtils';
import { catchAxios401Error } from '../../errors/catchAxios401Error';
import { CreatorAuth } from '../../generated/graphql';

export const postDataCustom = async (
    path: string,
    creatorAuth: CreatorAuth,
    data: any
) => {
    try {
        const auth = {
            'user-agent': creatorAuth.user_agent || '',
            'x-bc': creatorAuth.x_bc || '',
            'user-id': creatorAuth.user_id || '',
            cookie: creatorAuth.cookie || '',
        };

        const rules = {
            ...(await getRules()),
            ...auth,
        };

        const headers = createHeaders(path, rules);

        return await axios.post(`${config.ONLYFANS_URL}${path}`, data, {
            headers,
        });
    } catch (err) {
        catchAxios401Error(err);
    }
};
