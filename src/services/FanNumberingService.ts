import FanNumberingModel from '../models/FanNumberingModel';
import userService from './UserService';
import creatorService from './CreatorService';
import { validateChangeFanNumbering } from '../validation/fanNumberingValidation';
import { elevateError } from '../errors/elevateError';
import { IUser, ICreator, IFanNumbering } from '../types';
import { ChangeFanNumberingInput } from '../generated/graphql';

class FanNumberingService {
    private model: typeof FanNumberingModel = FanNumberingModel;

    async getFNById(welcomeSettingsId: string) {
        try {
            return (await this.model.findById(
                welcomeSettingsId
            )) as IFanNumbering;
        } catch (err) {
            elevateError(err);
        }
    }

    async getFNByCreatorId(token: string, creatorId: string) {
        try {
            const fanNumbering = (await this.model.findOne({
                creatorId: creatorId,
            })) as IFanNumbering;

            await this.ownerCreatorCheck(token, fanNumbering._id.toString());

            return fanNumbering;
        } catch (err) {
            elevateError(err);
        }
    }

    async createFanNumbering(creatorId: string, createdBy: string) {
        try {
            return await this.model.create({
                creatorId,
                createdBy,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changeFanNumbering(token: string, input: ChangeFanNumberingInput) {
        try {
            await validateChangeFanNumbering(input);
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

    async deleteFanNumberingByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({ creatorId });
        } catch (err) {
            elevateError(err);
            throw new Error('Error during deleting fan numbering');
        }
    }

    private async ownerCreatorCheck(
        token: string,
        promotionReactivatorId: string
    ) {
        const user = (await userService.getUserByToken(token)) as IUser;
        const promotionReactivator = (await this.model.findById(
            promotionReactivatorId
        )) as IFanNumbering;
        const creator = (await creatorService.getCreatorById(
            promotionReactivator.creatorId.toString()
        )) as ICreator;

        if (user.id.toString() !== creator.userId.toString()) {
            throw new Error('You are not the owner of this creator');
        }
    }
}

const fanNumberingService = new FanNumberingService();
export default fanNumberingService;
