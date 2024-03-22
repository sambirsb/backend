import ExpiringFansModel from '../models/ExpiringFansModel';
import userService from './UserService';
import creatorService from './CreatorService';
import { validateChangeExpiringFansValidation } from '../validation/expiringFansValidation';
import { elevateError } from '../errors/elevateError';
import { IExpiringFans, ICreator, IUser } from '../types';
import { ChangeExpiringFansInput } from '../generated/graphql';

class ExpiringFansService {
    private model: typeof ExpiringFansModel = ExpiringFansModel;

    async getEFById(expiringFansId: string) {
        try {
            return (await this.model.findById(expiringFansId)) as IExpiringFans;
        } catch (err) {
            elevateError(err);
        }
    }

    async getEFByCreatorId(token: string, creatorId: string) {
        try {
            const welcomeSettings = (await this.model.findOne({
                creatorId: creatorId,
            })) as IExpiringFans;

            await this.ownerCreatorCheck(token, welcomeSettings._id.toString());

            return welcomeSettings;
        } catch (err) {
            elevateError(err);
        }
    }

    async createExpiringFans(creatorId: string, createdBy: string) {
        try {
            return await this.model.create({
                creatorId,
                createdBy,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changeExpiringFans(token: string, input: ChangeExpiringFansInput) {
        try {
            await this.ownerCreatorCheck(token, input.id);
            await validateChangeExpiringFansValidation(input);

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

    async deleteExpiringFansByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({ creatorId });
        } catch (err) {
            elevateError(err);
        }
    }

    private async ownerCreatorCheck(token: string, welcomeSettingsId: string) {
        const user = (await userService.getUserByToken(token)) as IUser;
        const welcomeSettings = (await this.model.findById(
            welcomeSettingsId
        )) as IExpiringFans;
        const creator = (await creatorService.getCreatorById(
            welcomeSettings.creatorId.toString()
        )) as ICreator;

        if (user.id.toString() !== creator.userId.toString()) {
            throw new Error('You are not the owner of this creator');
        }
    }
}

const expiringFansService = new ExpiringFansService();
export default expiringFansService;
