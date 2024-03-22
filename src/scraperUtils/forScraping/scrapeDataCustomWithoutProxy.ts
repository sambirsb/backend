import axios from 'axios';
import { ONLYFANS_URL } from '../../constants/apiEndpointsOF';
import { createHeaders, getRules } from '../scraperConfigUtils';
import { catchAxios401Error } from '../../errors/catchAxios401Error';
import { CreatorAuth } from '../../generated/graphql';

export const scrapeDataCustomWithoutProxy = async (
    path: string,
    creatorAuth: CreatorAuth
) => {
    try {
        const user_id = creatorAuth.user_id;

        if (!user_id) {
            throw new Error('User_id is undefined');
        }

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

        const res = await axios.get(`${ONLYFANS_URL}${path}`, {
            headers,
        });

        if (!res || !res.data) {
            throw new Error(`Response data is undefined for the path: ${path}`);
        }

        return res.data;
    } catch (err) {
        catchAxios401Error(err);
    }
};
