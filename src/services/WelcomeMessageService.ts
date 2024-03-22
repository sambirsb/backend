import WelcomeSettingsModel from '../models/WelcomeSettingsModel';
import WelcomeMessageModel from '../models/WelcomeMessageModel';
import welcomeSettingsService from './WelcomeSettingsService';
import userService from './UserService';
import {
    validateChangeWelcomeMessage,
    validateCreateWelcomeMessage,
} from '../validation/massMessageValidation';
import { checkCreatorOwner } from '../utils/creators/checkCreatorOwner';
import { elevateError } from '../errors/elevateError';
import { IWelcomeMessage } from '../types';
import {
    ChangeWelcomeMessageInput,
    CreateWelcomeMessageInput,
} from '../generated/graphql';

class WelcomeMessageService {
    private welcomeMessageModel: typeof WelcomeMessageModel =
        WelcomeMessageModel;

    async getOneWelcomeMessage(token: string, welcomeMessageId: string) {
        try {
            const welcomeMessage = (await this.welcomeMessageModel.findById(
                welcomeMessageId
            )) as IWelcomeMessage;
            await this.ownerCreatorCheck(
                token,
                welcomeMessage.welcomeSettings.toString()
            );

            return welcomeMessage;
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllWelcomeMessage(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            const welcomeSettings = await WelcomeSettingsModel.findOne({
                creatorId,
            });

            if (!welcomeSettings)
                throw new Error('WelcomeSettings Is undefined');

            return await this.welcomeMessageModel.find({
                welcomeSettings: welcomeSettings._id,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async createWelcomeMessage(
        token: string,
        input: CreateWelcomeMessageInput
    ) {
        try {
            await validateCreateWelcomeMessage(input);
            const welcomeSettings = await welcomeSettingsService.getWSById(
                input.welcomeSettings
            );

            if (!welcomeSettings) {
                throw new Error('WelcomeSettings not found');
            }

            await this.ownerCreatorCheck(token, welcomeSettings._id.toString());

            return await this.welcomeMessageModel.create({
                ...input,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changeWelcomeMessage(
        token: string,
        input: ChangeWelcomeMessageInput
    ) {
        try {
            await validateChangeWelcomeMessage(input);
            const welcomeMessage = (await this.welcomeMessageModel.findById(
                input.id
            )) as IWelcomeMessage;
            await this.ownerCreatorCheck(
                token,
                welcomeMessage.welcomeSettings._id.toString()
            );

            return await this.welcomeMessageModel.findOneAndUpdate(
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

    async deleteWelcomeMessage(token: string, welcomeMessageId: string) {
        try {
            const welcomeMessage = (await this.welcomeMessageModel.findById(
                welcomeMessageId
            )) as IWelcomeMessage;
            await this.ownerCreatorCheck(
                token,
                welcomeMessage.welcomeSettings.toString()
            );

            return await this.welcomeMessageModel.findByIdAndDelete(
                welcomeMessageId
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteAllWelcomeMessagesByCreatorId(creatorId: string) {
        try {
            return await this.welcomeMessageModel.deleteMany({
                'welcomeSettings.creatorId': creatorId,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    private async ownerCreatorCheck(token: string, welcomeSettingsId: string) {
        const user = await userService.getUserByToken(token);
        const welcomeSettings =
            await welcomeSettingsService.getWSById(welcomeSettingsId);

        if (!welcomeSettings) {
            throw new Error('WelcomeSettings not found');
        }

        if (user.id !== welcomeSettings.createdBy.toString()) {
            throw new Error('You are not the owner of this welcome settings.');
        }
    }
}

const welcomeMessageService = new WelcomeMessageService();
export default welcomeMessageService;
