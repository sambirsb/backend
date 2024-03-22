import mongoose from 'mongoose';
import messageService from '../../servicesStat/MessageService';
import { getMessageScrapedData } from '../index';
import { formatDate } from '../../utils/dates/formatDate';
import { ChatFirstMessageDates } from '../../typesStat/ChatTypes';
import { ChatUser } from '../../typesStat/fromOF/OFChattersResponseData';
import { CreatorAuth } from '../../generated/graphql';

export const getFirstMessageDates = async (
    user_id: string,
    chatList: ChatUser[],
    creatorAuth: CreatorAuth,
    connection: mongoose.Connection
): Promise<ChatFirstMessageDates> => {
    try {
        const chatFirstMessageDates: ChatFirstMessageDates = {};

        const promises = chatList.map(async (chatUser) => {
            const withUserId = chatUser.withUser.id;

            try {
                const messageData = await getMessageScrapedData(
                    withUserId.toString(),
                    creatorAuth
                );

                await messageService.updateMessages(
                    messageData,
                    user_id,
                    connection
                );

                const messages = messageData.list;

                let hasTip = false;
                let chatDate = '';

                for (const message of messages) {
                    if (message.tipAmount || message.price > 0) {
                        chatDate = formatDate(message.createdAt);
                        hasTip = true;
                        break;
                    }
                }

                if (!hasTip && messages.length > 0) {
                    const firstMessage = messages[messages.length - 1];
                    chatDate = formatDate(firstMessage.createdAt);
                }

                chatFirstMessageDates[withUserId] = {
                    firstMessageDate: chatDate,
                    hasSellingChat: hasTip,
                };
            } catch (err) {
                console.error('Error:', err);
                throw err;
            }
        });

        await Promise.all(promises);

        return chatFirstMessageDates;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
