import { Connection } from 'mongoose';
import chatService from '../../servicesStat/ChatService';
import { getUserIdFromCreatorAuth } from '../../utils';
import { IChat } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getChatDataDB = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth,
    statConnection: Connection
): Promise<IChat[]> => {
    try {
        const user_id = await getUserIdFromCreatorAuth(creatorAuth);

        return await chatService.getChats(
            user_id,
            startDate,
            endDate,
            statConnection
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
