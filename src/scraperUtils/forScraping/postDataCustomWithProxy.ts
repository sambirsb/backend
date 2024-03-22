import { config } from '../../constants/config/env';
import { getAxiosInstWithHeaders } from './getAxiosInstWithHeaders';
import { catchAxios401Error } from '../../errors/catchAxios401Error';
import { CreatorAuth } from '../../generated/graphql';

export const postDataCustomWithProxy = async (
    path: string,
    creatorAuth: CreatorAuth,
    data: any
) => {
    try {
        const { axiosInstance, headers } = await getAxiosInstWithHeaders(
            path,
            creatorAuth
        );

        return await axiosInstance.post(`${config.ONLYFANS_URL}${path}`, data, {
            headers,
        });
    } catch (err: any) {
        catchAxios401Error(err);
    }
};
