import authService from '../../services/AuthService';
import displaySettingsService from '../../services/DisplaySettingsService';
import { elevateError } from '../../errors/elevateError';
import { ChangeDisplaySettingsInput } from '../../generated/graphql';

const displaySettingsMutationResolver = {
    Mutation: {
        async changeDisplaySettings(
            _: never,
            { input }: { input: ChangeDisplaySettingsInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const displaySettings =
                    await displaySettingsService.changeDisplaySettings(
                        token,
                        input
                    );

                return {
                    message: 'Display settings changed successfully',
                    displaySettings,
                };
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default displaySettingsMutationResolver;
