import { postMessagesSend } from '../../scraperUtils';
import { generateRandomInt, delay, personalizedReplacement } from '../';
import { CreatorAuth } from '../../generated/graphql';

export const sendWelcomeMessage = async (message: any, creator: any) => {
    const size = creator.welcomeData.welcomeMessages.length;
    const numberOfMessage = generateRandomInt(size);

    const mediaFiles =
        creator.welcomeData.welcomeMessages[numberOfMessage].media;
    const userId = message.user.id;

    const personalizedText = personalizedReplacement(
        message.user,
        creator.welcomeData.welcomeMessages[numberOfMessage]
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

    await delay(60000 * creator.welcomeData.welcomeSettings.time);
    await postMessagesSend(userId, data, creator.creatorAuth as CreatorAuth);
};
