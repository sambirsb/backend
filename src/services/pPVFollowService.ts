import PPVFollowModel from '../models/PPVFollowModel';
import PPVMessageModel from '../models/PPVMessageModel';
import {
    validateChangePPVFollow,
    validateCreatePPVFollow,
} from '../validation/pPVFollowValidation';
import { checkCreatorOwner } from '../utils/creators/checkCreatorOwner';
import { elevateError } from '../errors/elevateError';
import { IPPVFollow } from '../types';
import { ChangePpvFollowInput } from '../generated/graphql';

export interface CreatePPVFollowInput {
    creatorId: string;
    active?: boolean;
    include?: boolean;
    time?: number;
}

class PPVFollowService {
    private model: typeof PPVFollowModel = PPVFollowModel;

    async getById(id: string) {
        try {
            return await this.model.findById(id);
        } catch (err) {
            elevateError(err);
        }
    }

    async getPPVFollowByCreatorId(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            return await this.model.findOne({
                creatorId,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async getPPVWithMessages(creatorId: string) {
        try {
            const ppvSettings = (await this.model.findOne({
                creatorId,
            })) as IPPVFollow;

            const ppvMessages = await PPVMessageModel.find({
                creatorId,
            });

            return {
                ppvSettings,
                ppvMessages,
            };
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get welcome settings by creator id.');
        }
    }

    async createPPVFollow(userId: string, input: CreatePPVFollowInput) {
        try {
            await validateCreatePPVFollow(input);

            return await this.model.create({
                ...input,
                createdBy: userId,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changePPVFollow(token: string, input: ChangePpvFollowInput) {
        try {
            await validateChangePPVFollow(input);
            const pPVFollow = (await this.model.findOne({
                _id: input.id,
            })) as IPPVFollow;

            await checkCreatorOwner(token, pPVFollow.creatorId.toString());

            return await this.model.findByIdAndUpdate(
                { _id: input.id },
                {
                    ...input,
                },
                { new: true }
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async deletePPVFollowsByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({ creatorId });
        } catch (err) {
            elevateError(err);
        }
    }
}

const ppvFollowService = new PPVFollowService();
export default ppvFollowService;
