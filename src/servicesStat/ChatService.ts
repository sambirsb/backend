import { Connection, QueryOptions } from 'mongoose';
import ChatModel from '../modelsStat/ChatModel';
import { ChatUser } from '../typesStat/fromOF/OFChattersResponseData';
import { IChat } from '../typesStat/IChat';
import { ChatFirstMessageDates } from '../typesStat/ChatTypes';

class ChatService {
    async getChats(
        user_id: string,
        startDate: string,
        endDate: string,
        statConnection: Connection
    ): Promise<IChat[]> {
        try {
            const ChatModelObj = ChatModel(statConnection);

            const start = new Date(startDate);
            const end = new Date(endDate);

            const chats = (await ChatModelObj.find({
                user_id: Number(user_id),
                openChatDate: {
                    $gte: start,
                    $lte: end,
                },
            }).sort({ openChatDate: -1 })) as IChat[];

            if (chats.length === 0) {
                return [];
            }

            return chats;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async updateChats(
        data: ChatUser[],
        user_id: string,
        chatFirstMessageDates: ChatFirstMessageDates,
        statConnection: Connection
    ) {
        const ChatModelObj = ChatModel(statConnection);

        for (let i = 0; i < data.length; i++) {
            const chatUser = data[i];
            const userDetails = chatFirstMessageDates[chatUser.withUser.id];

            const chatData = {
                user_id: Number(user_id),
                friend_user_id: chatUser.withUser.id,
                openChatDate: userDetails
                    ? new Date(userDetails.firstMessageDate)
                    : new Date(),
                hasSellingChat: userDetails
                    ? userDetails.hasSellingChat
                    : false,
            };

            const updatedChat = await ChatModelObj.findOneAndUpdate(
                {
                    user_id: Number(user_id),
                    friend_user_id: chatUser.withUser.id,
                },
                chatData,
                { new: true, upsert: true } as QueryOptions
            );

            if (!updatedChat) {
                await ChatModelObj.create(chatData);
            }
        }
    }
}

const chatService = new ChatService();
export default chatService;
