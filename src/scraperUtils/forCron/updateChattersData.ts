import { Connection } from 'mongoose';
import chatService from '../../servicesStat/ChatService';
import { getChattersScrapedData, getFirstMessageDates } from '../index';
import { elevateError } from '../../errors/elevateError';
import { ICreator } from '../../types';
import { OFChattersResponseData } from '../../typesStat/fromOF/OFChattersResponseData';

export const updateChattersData = async (
    lastUpdatedDate: Date,
    creator: ICreator,
    connection: Connection
) => {
    try {
        const user_id = creator.creatorAuth?.user_id;

        if (!creator.creatorAuth || !user_id) {
            throw new Error('CreatorAuth is undefined');
        }

        const actualData = (await getChattersScrapedData(
            creator.creatorAuth
        )) as OFChattersResponseData;

        if (!actualData) {
            return;
        }

        const chatFirstMessageDates = await getFirstMessageDates(
            user_id,
            actualData.list,
            creator.creatorAuth,
            connection
        );

        await chatService.updateChats(
            actualData.list,
            user_id,
            chatFirstMessageDates,
            connection
        );
    } catch (err) {
        elevateError(err);
    }
};
