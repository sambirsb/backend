import { CreatorAuth } from '../../generated/graphql';

export const getUserIdFromCreatorAuth = async (creatorAuth: CreatorAuth) => {
    const user_id = creatorAuth.user_id;

    if (!user_id) {
        throw new Error('User id is undefined');
    }

    return user_id;
};
