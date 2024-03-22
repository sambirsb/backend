import authService from '../../services/AuthService';
import welcomeSettingsService from '../../services/WelcomeSettingsService';

const welcomeSettingsQueryResolver = {
    Query: {
        async getWelcomeSettings(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await welcomeSettingsService.getWSByCreatorId(
                    token,
                    creatorId
                );
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get welcome settings.');
            }
        },
    },
};

export default welcomeSettingsQueryResolver;
