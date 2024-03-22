import AutoFollowModel from '../models/AutoFollowModel';
import userService from './UserService';
import creatorService from './CreatorService';
import { validateChangeAutoFollow } from '../validation/autoFollowValidation';
import { elevateError } from '../errors/elevateError';
import { IAutoFollow, IUser, ICreator } from '../types';
import { ChangeAutoFollowInput } from '../generated/graphql';

class AutoFollowService {
    private model: typeof AutoFollowModel = AutoFollowModel;

    async getAFById(welcomeSettingsId: string) {
        try {
            return (await this.model.findById(
                welcomeSettingsId
            )) as IAutoFollow;
        } catch (err) {
            elevateError(err);
        }
    }

    async getAFByCreatorId(token: string, creatorId: string) {
        try {
            const fanNumbering = (await this.model.findOne({
                creatorId: creatorId,
            })) as IAutoFollow;

            await this.ownerCreatorCheck(token, fanNumbering._id.toString());

            return fanNumbering;
        } catch (err) {
            elevateError(err);
        }
    }

    async getAFByCreatorIdWebSocket(creatorId: string) {
        try {
            return (await this.model.findOne({
                creatorId: creatorId,
            })) as IAutoFollow;
        } catch (err) {
            elevateError(err);
        }
    }

    async createAutoFollow(creatorId: string, createdBy: string) {
        try {
            return await this.model.create({
                creatorId,
                createdBy,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changeAutoFollow(token: string, input: ChangeAutoFollowInput) {
        try {
            await this.ownerCreatorCheck(token, input.id);
            await validateChangeAutoFollow(input);

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

    async deleteAutoFollowsByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({ creatorId });
        } catch (err) {
            elevateError(err);
        }
    }

    private async ownerCreatorCheck(token: string, autoFollowId: string) {
        const user = (await userService.getUserByToken(token)) as IUser;
        const autoFollow = (await this.model.findById(
            autoFollowId
        )) as IAutoFollow;
        const creator = (await creatorService.getCreatorById(
            autoFollow.creatorId.toString()
        )) as ICreator;

        if (user.id.toString() !== creator.userId.toString()) {
            throw new Error('You are not the owner of this creator');
        }
    }
}

const autoFollowService = new AutoFollowService();
export default autoFollowService;
