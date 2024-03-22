import { config } from '../../constants/config/env';
import { getAxiosInstWithHeaders } from './getAxiosInstWithHeaders';
import { catchAxios401Error } from '../../errors/catchAxios401Error';
import { CreatorAuth } from '../../generated/graphql';

export const scrapeDataCustomWithProxy = async (
    path: string,
    creatorAuth: CreatorAuth
) => {
    try {
        const { axiosInstance, headers } = await getAxiosInstWithHeaders(
            path,
            creatorAuth
        );

        const res = await axiosInstance.get(`${config.ONLYFANS_URL}${path}`, {
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
