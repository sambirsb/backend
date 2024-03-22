import { ENDPOINTS_OF, FILTERS_OF } from '../../constants/apiEndpointsOF';
import { postDataCustomWithProxy } from '../';
import { MassMessagingData } from '../../types/MassMessagingTypes';
import { CreatorAuth } from '../../generated/graphql';

export const postMessagesSend = async (
    chatId: string,
    data: MassMessagingData,
    creatorAuth: CreatorAuth
) => {
    try {
        const messageSendPath = `${ENDPOINTS_OF.chatters}/${chatId}/${FILTERS_OF.messages}`;

        await postDataCustomWithProxy(messageSendPath, creatorAuth, data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
