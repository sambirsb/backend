import authService from '../../services/AuthService';
import promotionReactivatorService from '../../services/PromotionReactivatorService';
import { elevateError } from '../../errors/elevateError';

const promotionReactivatorQueryResolver = {
    Query: {
        async getPromotionReactivator(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await promotionReactivatorService.getPRByCreatorId(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default promotionReactivatorQueryResolver;
