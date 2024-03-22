import CreatorModel from '../../models/CreatorModel';
import welcomeSettingsService from '../../services/WelcomeSettingsService';
import ppvFollowService from '../../services/pPVFollowService';

export const fetchCreatorTokens = async () => {
    try {
        const creators = (await CreatorModel.find({
            'creatorAuth.expiredAt': { $gt: new Date() },
        })) as any[];

        for (let i = 0; i < creators.length; i++) {
            try {
                const welcomeData =
                    await welcomeSettingsService.getWSWithMessages(
                        creators[i].id
                    );

                const ppvInfo = await ppvFollowService.getPPVWithMessages(
                    creators[i].id
                );

                creators[i] = { ...creators[i]._doc, welcomeData, ppvInfo };
            } catch (error) {
                console.error(
                    `Error fetching welcome messages for creator ${creators[i].id}:`,
                    error
                );
            }
        }

        return creators;
    } catch (error) {
        console.error('Error fetching creators:', error);
        return [];
    }
};
