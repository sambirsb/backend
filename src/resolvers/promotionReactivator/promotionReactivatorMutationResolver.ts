import authService from '../../services/AuthService';
import promotionReactivatorService from '../../services/PromotionReactivatorService';
import { elevateError } from '../../errors/elevateError';
import { ChangePromotionReactivatorInput } from '../../generated/graphql';

const promotionReactivatorMutationResolver = {
    Mutation: {
        async changePromotionReactivator(
            _: never,
            { input }: { input: ChangePromotionReactivatorInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await promotionReactivatorService.changePromotionReactivator(
                    token,
                    input
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default promotionReactivatorMutationResolver;
