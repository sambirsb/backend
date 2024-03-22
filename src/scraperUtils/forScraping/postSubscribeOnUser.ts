import { API_BASE_OF } from '../../constants/apiEndpointsOF';
import { IDataSource } from '../../types';
import { postDataCustomWithProxy } from './postDataCustomWithProxy';
import { CreatorAuth } from '../../generated/graphql';

export const postSubscribeOnUser = async (
    data: IDataSource,
    creatorAuth: CreatorAuth,
    userId: number
) => {
    try {
        const subscribeOnUserPath = `${API_BASE_OF}/users/${userId}/subscribe`;

        return await postDataCustomWithProxy(
            subscribeOnUserPath,
            creatorAuth as CreatorAuth,
            data
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
