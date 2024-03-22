import userService from './UserService';
import creatorService from './CreatorService';
import PromotionReactivatorModel from '../models/PromotionReactivatorModel';
import { validateChangePromotionReactivator } from '../validation/promotionReactivatorValidation';
import { elevateError } from '../errors/elevateError';
import { IPromotionReactivator, ICreator, IUser } from '../types';
import { ChangePromotionReactivatorInput } from '../generated/graphql';

class PromotionReactivatorService {
    private model: typeof PromotionReactivatorModel = PromotionReactivatorModel;

    async getPRById(welcomeSettingsId: string) {
        try {
            return (await this.model.findById(
                welcomeSettingsId
            )) as IPromotionReactivator;
        } catch (err) {
            elevateError(err);
        }
    }

    async getPRByCreatorId(token: string, creatorId: string) {
        try {
            const promotionReactivator = (await this.model.findOne({
                creatorId: creatorId,
            })) as IPromotionReactivator;

            await this.ownerCreatorCheck(
                token,
                promotionReactivator._id.toString()
            );

            return promotionReactivator;
        } catch (err) {
            elevateError(err);
        }
    }

    async getPRByCreatorIdWebSocket(creatorId: string) {
        try {
            return (await this.model.findOne({
                creatorId: creatorId,
            })) as IPromotionReactivator;
        } catch (err) {
            elevateError(err);
        }
    }

    async createPromotionReactivator(creatorId: string, createdBy: string) {
        try {
            return await this.model.create({
                creatorId,
                createdBy,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changePromotionReactivator(
        token: string,
        input: ChangePromotionReactivatorInput
    ) {
        try {
            await validateChangePromotionReactivator(input);
            await this.ownerCreatorCheck(token, input.id);

            return await this.model.findOneAndUpdate(
                {
                    _id: input.id,
                },
                {
                    ...input,
                },
                {
                    new: true,
                }
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async deletePromotionReactivatorsByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({ creatorId });
        } catch (err) {
            elevateError(err);
        }
    }

    private async ownerCreatorCheck(
        token: string,
        promotionReactivatorId: string
    ) {
        const user = (await userService.getUserByToken(token)) as IUser;
        const promotionReactivator = (await this.model.findById(
            promotionReactivatorId
        )) as IPromotionReactivator;
        const creator = (await creatorService.getCreatorById(
            promotionReactivator.creatorId.toString()
        )) as ICreator;

        if (user.id.toString() !== creator.userId.toString()) {
            throw new Error('You are not the owner of this creator');
        }
    }
}

const promotionReactivatorService = new PromotionReactivatorService();
export default promotionReactivatorService;
