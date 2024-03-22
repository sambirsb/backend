import ExpiringFansModel from '../models/ExpiringFansModel';
import ExpiringFansMessageModel from '../models/ExpiringFansMessageModel';
import userService from './UserService';
import expiringFansService from './ExpiringFansService';
import { checkCreatorOwner } from '../utils/creators/checkCreatorOwner';
import {
    validateChangeExpiringFansMessage,
    validateCreateExpiringFansMessage,
} from '../validation/expiringFansMessageValidation';
import { elevateError } from '../errors/elevateError';
import { IExpiringFansMessage, IExpiringFans } from '../types';
import {
    ChangeExpiringFansMessageInput,
    CreateExpiringFansMessageInput,
} from '../generated/graphql';

class ExpiringFansMessageService {
    private model: typeof ExpiringFansMessageModel = ExpiringFansMessageModel;

    async getOneExpiringFansMessage(token: string, expiringFansId: string) {
        try {
            const expiringFansMessageModel = (await this.model.findById(
                expiringFansId
            )) as IExpiringFansMessage;
            await this.ownerCreatorCheck(
                token,
                expiringFansMessageModel.expiringFans.toString()
            );

            return expiringFansMessageModel;
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllExpiringFansMessages(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            const expiringFans = (await ExpiringFansModel.findOne({
                creatorId,
            })) as IExpiringFans;
            if (!expiringFans) throw new Error('Expiring fans Is undefined');

            return await this.model.find({ expiringFans: expiringFans._id });
        } catch (err) {
            elevateError(err);
        }
    }

    async createExpiringFansMessage(
        token: string,
        input: CreateExpiringFansMessageInput
    ) {
        try {
            await validateCreateExpiringFansMessage(input);
            const expiringFans = await expiringFansService.getEFById(
                input.expiringFans
            );

            if (!expiringFans) throw new Error('Expiring fans Is undefined');

            await this.ownerCreatorCheck(token, expiringFans._id.toString());

            return await this.model.create({
                ...input,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changeExpiringFansMessage(
        token: string,
        input: ChangeExpiringFansMessageInput
    ) {
        try {
            await validateChangeExpiringFansMessage(input);
            const expiringFans = (await this.model.findById(
                input.id
            )) as IExpiringFansMessage;
            await this.ownerCreatorCheck(
                token,
                expiringFans.expiringFans._id.toString()
            );

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

    async deleteExpiringFansMessage(token: string, expiringFansId: string) {
        try {
            const expiringFansMessage = (await this.model.findById(
                expiringFansId
            )) as IExpiringFansMessage;
            await this.ownerCreatorCheck(
                token,
                expiringFansMessage.expiringFans.toString()
            );

            return await this.model.findByIdAndDelete(expiringFansId);
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteExpiringFansMessagesByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({
                'expiringFans.creatorId': creatorId,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    private async ownerCreatorCheck(token: string, expiringFansId: string) {
        const user = await userService.getUserByToken(token);
        const expiringFans =
            await expiringFansService.getEFById(expiringFansId);

        if (!expiringFans) {
            throw new Error('Expiring fans Is undefined');
        }

        if (user.id !== expiringFans.createdBy.toString()) {
            throw new Error('You are not owner of this creator');
        }
    }
}

const expiringFansMessageService = new ExpiringFansMessageService();
export default expiringFansMessageService;
