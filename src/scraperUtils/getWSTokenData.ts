import { config } from '../constants/config/env';
import { ENDPOINTS_OF } from '../constants/apiEndpointsOF';
import { getAxiosInstWithHeaders } from './forScraping/getAxiosInstWithHeaders';
import { catchAxios400Error } from '../errors/catchAxios400Error';
import { CreatorAuth } from '../generated/graphql';

export const getWSTokenData = async (creatorAuth: CreatorAuth) => {
    try {
        const mePath = `${ENDPOINTS_OF.me}`;

        const { axiosInstance, headers } = await getAxiosInstWithHeaders(
            mePath,
            creatorAuth
        );

        const res = await axiosInstance.get(`${config.ONLYFANS_URL}${mePath}`, {
            headers,
        });

        if (!res || !res.data) {
            throw new Error(
                `Response data is undefined for the path: ${mePath}`
            );
        }

        return res.data.wsAuthToken;
    } catch (err) {
        catchAxios400Error(err);
    }
};
