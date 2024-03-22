import { Connection, Types } from 'mongoose';
import chatService from '../../servicesStat/ChatService';
import { getChattersScrapedData, getFirstMessageDates } from '../index';
import { formatDate, getUserIdFromCreatorAuth } from '../../utils';
import { CountsByDate, OpenChatsCount, IChat } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

interface SimpleChat {
    _id: Types.ObjectId | null;
    user_id: number;
    friend_user_id: number;
    openChatDate: Date;
    hasSellingChat: boolean;
}

export const getOpenChatsCountResponseData = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth,
    statConnection: Connection
): Promise<OpenChatsCount[]> => {
    try {
        const user_id = await getUserIdFromCreatorAuth(creatorAuth);
        let chats: SimpleChat[] = [];
        const chatsFromDB = (await chatService.getChats(
            user_id,
            startDate,
            endDate,
            statConnection
        )) as IChat[];

        if (!chatsFromDB || chatsFromDB.length === 0) {
            const chattersData = await getChattersScrapedData(creatorAuth);

            if (!chattersData) {
                return [];
            }

            const chatFirstMessageDates = await getFirstMessageDates(
                user_id,
                chattersData.list,
                creatorAuth,
                statConnection
            );

            chats = chattersData.list.map((chatUser) => {
                const userDetails = chatFirstMessageDates[chatUser.withUser.id];

                return {
                    _id: null,
                    user_id: Number(user_id),
                    friend_user_id: chatUser.withUser.id,
                    openChatDate: userDetails
                        ? new Date(userDetails.firstMessageDate)
                        : new Date(),
                    hasSellingChat: userDetails
                        ? userDetails.hasSellingChat
                        : false,
                };
            });
        }

        const countsByDate: CountsByDate = {};

        const currentDate = new Date(startDate);
        const endDateObj = new Date(endDate);
        while (currentDate <= endDateObj) {
            const dateStr = formatDate(currentDate.toString());
            countsByDate[dateStr] = { openChats: 0, sellingChats: 0 };
            currentDate.setDate(currentDate.getDate() + 1);
        }

        chats.forEach(({ openChatDate, hasSellingChat }) => {
            const dateStr = formatDate(openChatDate.toString());
            if (dateStr in countsByDate) {
                countsByDate[dateStr].openChats += 1;
                if (hasSellingChat) {
                    countsByDate[dateStr].sellingChats += 1;
                }
            }
        });

        return Object.entries(countsByDate).map(
            ([date, { openChats, sellingChats }]) => ({
                date,
                openChats: openChats,
                sellingChats: sellingChats,
            })
        );
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
