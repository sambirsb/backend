import authService from '../../services/AuthService';
import displayColorsService from '../../services/DisplayColorsService';
import { elevateError } from '../../errors/elevateError';

const displayColorQueryResolver = {
    Query: {
        async getOneDisplayColor(
            _: never,
            { displayColorId }: { displayColorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await displayColorsService.getOneDisplayColor(
                    token,
                    displayColorId
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getAllDisplayColors(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await displayColorsService.getAllDisplayColors(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default displayColorQueryResolver;
