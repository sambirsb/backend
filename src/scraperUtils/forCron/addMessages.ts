import { Connection } from 'mongoose';
import messageService from '../../servicesStat/MessageService';
import { getChattersScrapedData, getMessageScrapedData } from '../index';
import { getUserIdFromCreatorAuth } from '../../utils';
import { elevateError } from '../../errors/elevateError';
import { ChatUser } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const addMessages = async (
    creatorAuth: CreatorAuth,
    statConnection: Connection
) => {
    try {
        const user_id = await getUserIdFromCreatorAuth(creatorAuth);

        const chattersData = await getChattersScrapedData(creatorAuth);

        const messagesPromises = chattersData.list.map(
            async (chatUser: ChatUser) => {
                const response = await getMessageScrapedData(
                    chatUser.withUser.id.toString(),
                    creatorAuth
                );

                return messageService.updateMessages(
                    response,
                    user_id,
                    statConnection
                );
            }
        );

        await Promise.all(messagesPromises);
    } catch (err) {
        elevateError(err);
    }
};
