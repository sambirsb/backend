import { postMessagesSend } from '../../scraperUtils';
import { generateRandomInt, delay, personalizedReplacement } from '../';
import { CreatorAuth } from '../../generated/graphql';

export const sendPPVFollowUps = async (message: any, creator: any) => {
    const size = creator.ppvInfo.ppvMessages.length;
    const numberOfMessage = generateRandomInt(size);

    const mediaFiles = await creator.ppvInfo.ppvMessages[numberOfMessage].media;
    const userId = await message.toUser.id;

    const personalizedText = await personalizedReplacement(
        message.toUser,
        creator.ppvInfo.ppvMessages[numberOfMessage]
    );

    const data = {
        isCouplePeopleMedia: false,
        isForward: false,
        lockedText: false,
        mediaFiles,
        previews: [],
        price: 0,
        text: personalizedText,
    };

    await delay(60000 * creator.ppvInfo.ppvSettings.time);

    //TODO додати перевірку на прочитане повідомлення

    await postMessagesSend(userId, data, creator.creatorAuth as CreatorAuth);
};
