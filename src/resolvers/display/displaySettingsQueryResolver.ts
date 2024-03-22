import authService from '../../services/AuthService';
import displaySettingsService from '../../services/DisplaySettingsService';
import { elevateError } from '../../errors/elevateError';

const displaySettingsQueryResolver = {
    Query: {
        async getDisplaySettings(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await displaySettingsService.getDSByCreatorId(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default displaySettingsQueryResolver;
