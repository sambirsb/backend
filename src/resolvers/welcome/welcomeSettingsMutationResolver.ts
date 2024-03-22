import authService from '../../services/AuthService';
import welcomeSettingsService from '../../services/WelcomeSettingsService';
import { ChangeWelcomeSettingsInput } from '../../generated/graphql';

const welcomeSettingsMutationResolver = {
    Mutation: {
        async changeWelcomeSettings(
            _: never,
            { input }: { input: ChangeWelcomeSettingsInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const welcomeSettings =
                    await welcomeSettingsService.changeWelcomeSettings(
                        token,
                        input
                    );

                return {
                    message: 'Welcome settings changed successfully',
                    welcomeSettings,
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change welcome settings.');
            }
        },
    },
};

export default welcomeSettingsMutationResolver;
