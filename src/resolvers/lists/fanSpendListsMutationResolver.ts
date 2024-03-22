import authService from '../../services/AuthService';
import fanSpendListsService from '../../services/FanSpendListsService';
import { elevateError } from '../../errors/elevateError';
import {
    ChangeFanSpendListsInput,
    CreateFanSpendListsInput,
} from '../../generated/graphql';

const fanSpendListsMutationResolver = {
    Mutation: {
        async createFanSpendLists(
            _: never,
            { input }: { input: CreateFanSpendListsInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                return await fanSpendListsService.createFanSpendLists(
                    token,
                    input
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async changeFanSpendLists(
            _: never,
            { input }: { input: ChangeFanSpendListsInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                return await fanSpendListsService.changeFanSpendLists(
                    token,
                    input
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async deleteFanSpendLists(
            _: never,
            { id }: { id: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                return await fanSpendListsService.deleteFanSpendLists(
                    token,
                    id
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default fanSpendListsMutationResolver;
