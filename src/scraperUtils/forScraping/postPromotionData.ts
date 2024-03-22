import { ENDPOINTS_OF } from '../../constants/apiEndpointsOF';
import { CreatorAuth } from '../../generated/graphql';
import { OFPromotionReactivator } from '../../typesStat/toOF/OFPromotionReactivator';
import { postDataCustomWithProxy } from './postDataCustomWithProxy';

export const postPromotionData = async (
    promotionData: OFPromotionReactivator,
    creatorAuth: CreatorAuth
) => {
    try {
        const promotionCreatePath = `${ENDPOINTS_OF.promotions}`;

        return await postDataCustomWithProxy(
            promotionCreatePath,
            creatorAuth as CreatorAuth,
            promotionData
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
