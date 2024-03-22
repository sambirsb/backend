import authService from '../../services/AuthService';
import displayColorsService from '../../services/DisplayColorsService';
import { elevateError } from '../../errors/elevateError';
import { IDisplayColors } from '../../types';
import {
    ChangeDisplayColorInput,
    CreateDisplayColorInput,
} from '../../generated/graphql';

const displayColorMutationResolver = {
    Mutation: {
        async createDisplayColor(
            _: never,
            { input }: { input: CreateDisplayColorInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const displayColor =
                    (await displayColorsService.createDisplayColor(
                        token,
                        input
                    )) as IDisplayColors;

                return {
                    message: `Display color with id: ${displayColor.id} was created`,
                    displayColor,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async changeDisplayColor(
            _: never,
            { input }: { input: ChangeDisplayColorInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const displayColor =
                    (await displayColorsService.changeDisplayColor(
                        token,
                        input
                    )) as IDisplayColors;

                return {
                    message: `Display color with id: ${displayColor.id} was updated`,
                    displayColor,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async deleteDisplayColor(
            _: never,
            { displayColorId }: { displayColorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                await displayColorsService.deleteDisplayColor(
                    token,
                    displayColorId
                );

                return `Display color with id: ${displayColorId} was deleted`;
            } catch (err) {
                elevateError(err);
            }
        },
    },
};
export default displayColorMutationResolver;
