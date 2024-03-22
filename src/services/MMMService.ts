import MMMModel from '../models/MMMModel';
import massMessagingService from './MassMessagingService';
import userService from './UserService';
import {
    validateChangeMassMessage,
    validateCreateMassMessage,
} from '../validation/mMMValidation';
import { elevateError } from '../errors/elevateError';
import { IMassMessaging, IUser, IMMM } from '../types';
import {
    ChangeMassMessageInput,
    CreateMassMessageInput,
    CreateMassMessageInputForMessaging,
    InputMaybe,
} from '../generated/graphql';

class MMMService {
    private model: typeof MMMModel = MMMModel;

    async findById(id: string) {
        return this.model.findById(id);
    }

    async getOneMassMessage(token: string, massMessageId: string) {
        try {
            const massMessage = (await this.model.findOne({
                _id: massMessageId,
            })) as IMMM;
            await this.checkMassMessagingOwner(
                token,
                massMessage.massMess.toString()
            );

            return await this.model.findOne({ _id: massMessageId });
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllMessages(token: string, massMessId: string) {
        try {
            await this.checkMassMessagingOwner(token, massMessId);

            return await this.model.find({ massMess: massMessId });
        } catch (err) {
            elevateError(err);
        }
    }

    async createMassMessage(token: string, input: CreateMassMessageInput) {
        try {
            await validateCreateMassMessage(input);

            const massMessaging = (await massMessagingService.findById(
                input.massMess
            )) as IMassMessaging;
            await this.checkMassMessagingOwner(
                token,
                massMessaging._id.toString()
            );

            return await this.model.create({
                ...input,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async createManyMassMessages(
        massMessagingId: string,
        messages: Array<InputMaybe<CreateMassMessageInputForMessaging>>
    ) {
        try {
            const massMessagesToCreate = messages.map((message) => ({
                massMess: massMessagingId,
                ...message,
            }));

            return await this.model.insertMany(massMessagesToCreate);
        } catch (err) {
            elevateError(err);
        }
    }

    async changeMassMessage(token: string, input: ChangeMassMessageInput) {
        try {
            await validateChangeMassMessage(input);

            const massMessage = (await this.model.findOne({
                _id: input.id,
            })) as IMMM;
            await this.checkMassMessagingOwner(
                token,
                massMessage.massMess.toString()
            );

            return await this.model.findOneAndUpdate(
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

    async deleteMassMessage(token: string, massMessageId: string) {
        try {
            const massMessage = (await this.model.findOne({
                _id: massMessageId,
            })) as IMMM;
            await this.checkMassMessagingOwner(
                token,
                massMessage.massMess.toString()
            );

            await this.model.deleteOne({ _id: massMessageId });
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteAllMassMessagesForCreatorId(creatorId: string) {
        try {
            return this.model.deleteMany({
                'massMessaging.creatorId': creatorId,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    private async checkMassMessagingOwner(
        token: string,
        massMessagingId: string
    ) {
        const massMessaging = (await massMessagingService.findById(
            massMessagingId
        )) as IMassMessaging;

        const user = (await userService.getUserByToken(token)) as IUser;

        if (massMessaging.createdBy.toString() !== user.id.toString()) {
            throw new Error('You are not creator of this mass messaging!');
        }
    }
}

const mMMService = new MMMService();
export default mMMService;
