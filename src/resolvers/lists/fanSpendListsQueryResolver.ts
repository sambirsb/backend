import authService from '../../services/AuthService';
import fanSpendListsService from '../../services/FanSpendListsService';
import { elevateError } from '../../errors/elevateError';

const fanSpendListsQueryResolver = {
    Query: {
        async getFanSpendListsById(
            _: never,
            { id }: { id: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                return await fanSpendListsService.getFanSpendListsById(
                    token,
                    id
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getCreatorFanSpendLists(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                return await fanSpendListsService.getCreatorFanSpendLists(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default fanSpendListsQueryResolver;
