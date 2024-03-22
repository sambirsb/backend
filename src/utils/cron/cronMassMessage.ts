import cron from 'node-cron';
import massMessagingService from '../../services/MassMessagingService';
import scraperService from '../../services/ScraperService';
import { personalizedReplacement } from '..';
import { postMessagesSend } from '../../scraperUtils';
import { IPopulateMassMessagingMessage, IChatsOnlyFans } from '../../types';
import { CreatorAuth } from '../../generated/graphql';

export const cronMassMessage = () => {
    cron.schedule('* * * * *', async () => {
        const documents =
            (await massMessagingService.fetchMassMessagingDocuments()) as IPopulateMassMessagingMessage[];

        if (documents) {
            for (const document of documents) {
                for (const message of document.messages) {
                    const chats =
                        (await scraperService.getChatsForMassMessaging(
                            String(document.creatorId._id)
                        )) as IChatsOnlyFans[];

                    const sendMessagesPromises = chats.map(async (chat) => {
                        const modifiedText = personalizedReplacement(
                            chat,
                            message
                        );

                        const data = {
                            isCouplePeopleMedia: false,
                            isForward: false,
                            lockedText: false,
                            mediaFiles: [],
                            previews: [],
                            price: 0,
                            text: modifiedText,
                        };

                        return postMessagesSend(
                            chat.id.toString(),
                            data,
                            document.creatorId.creatorAuth as CreatorAuth
                        );
                    });
                    await Promise.all(sendMessagesPromises);

                    await massMessagingService.incrementSentMessagesCount(
                        document.id,
                        chats.length
                    );
                }
            }
        }
    });
};
