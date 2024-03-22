import mongoose from 'mongoose';
import ppvMessageService from '../../services/pPVMessageService';
import { getUserIdFromCreatorAuth } from '../../utils';
import { getChattersScrapedData } from '../forScraping/getChattersScrapedData';
import { getMessageScrapedData } from '../forScraping/getMessageScrapedData';
import { OFMessage, ChatUser } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getMessagesFromChatsNoScrap = async (
    creatorAuth: CreatorAuth,
    statConnection: mongoose.Connection
): Promise<{ allMessages: OFMessage[]; ppvMessages: OFMessage[] }> => {
    try {
        const user_id = await getUserIdFromCreatorAuth(creatorAuth);
        const messages = await ppvMessageService.getMessagesList(
            user_id,
            statConnection
        );

        const allMessages: any[] = messages.map((message) => ({
            ...message.OF_message,
            id: message._id,
            isNew: message.OF_message.isOpened,
        }));

        const ppvMessages = allMessages.filter((message) => !message.isFree);

        return { allMessages, ppvMessages };
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};

export const getMessagesFromChats = async (
    creatorAuth: CreatorAuth
): Promise<{ allMessages: OFMessage[]; ppvMessages: OFMessage[] }> => {
    try {
        const chattersResponse = await getChattersScrapedData(creatorAuth);

        const messagesPromises = chattersResponse.list.map(
            (chatUser: ChatUser) => {
                return getMessageScrapedData(
                    chatUser.withUser.id.toString(),
                    creatorAuth
                );
            }
        );

        const messagesResponses = await Promise.all(messagesPromises);

        let allMessages: OFMessage[] = [];
        let ppvMessages: OFMessage[] = [];

        messagesResponses.forEach((response) => {
            const messages = response.list as OFMessage[];
            allMessages = [...allMessages, ...messages];
            const filteredPPVMessages = messages.filter(
                (message) => !message.isFree
            );
            ppvMessages = [...ppvMessages, ...filteredPPVMessages];
        });

        return { allMessages, ppvMessages };
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
