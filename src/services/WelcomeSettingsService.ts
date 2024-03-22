import schedule from 'node-schedule';
import WelcomeSettingsModel from '../models/WelcomeSettingsModel';
import WelcomeMessageModel from '../models/WelcomeMessageModel';
import userService from './UserService';
import creatorService from './CreatorService';
import { elevateError } from '../errors/elevateError';
import { IUser, ICreator, IWelcomeSettings } from '../types';
import { ChangeWelcomeSettingsInput } from '../generated/graphql';

class WelcomeSettingsService {
    private model: typeof WelcomeSettingsModel = WelcomeSettingsModel;

    async getWSById(welcomeSettingsId: string) {
        try {
            return (await this.model.findById(
                welcomeSettingsId
            )) as IWelcomeSettings;
        } catch (err) {
            elevateError(err);
        }
    }

    async getWSByCreatorId(token: string, creatorId: string) {
        try {
            const welcomeSettings = (await this.model.findOne({
                creatorId: creatorId,
            })) as IWelcomeSettings;

            await this.ownerCreatorCheck(token, welcomeSettings._id.toString());

            return welcomeSettings;
        } catch (err) {
            elevateError(err);
        }
    }

    async getWSWithMessages(creatorId: string) {
        try {
            const welcomeSettings = (await this.model.findOne({
                creatorId: creatorId,
            })) as IWelcomeSettings;

            const welcomeMessages = await WelcomeMessageModel.find({
                welcomeSettings: welcomeSettings._id,
            });

            // Возвращаем как WelcomeSettings, так и WelcomeMessages
            return {
                welcomeSettings,
                welcomeMessages,
            };
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get welcome settings by creator id.');
        }
    }

    async createWelcomeSettings(creatorId: string, createdBy: string) {
        try {
            return await this.model.create({
                creatorId,
                createdBy,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changeWelcomeSettings(
        token: string,
        input: ChangeWelcomeSettingsInput
    ) {
        try {
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

    async temporarySendWelcomeMessage(token: string, creatorId: string) {
        try {
            await this.ownerCreatorCheck(token, creatorId);

            const welcomeSettings = (await this.model.find({
                creatorId,
                active: true,
            })) as IWelcomeSettings[];

            if (welcomeSettings) {
                for (const welcomeSetting of welcomeSettings) {
                    schedule.scheduleJob(welcomeSetting.time, function () {
                        // logic to send the message

                        // TODO send real message
                        console.log(`Sending message: ${welcomeSetting._id}`);
                    });
                    return 'Message scheduled successfully';
                }
            }
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteWelcomeSettingsByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({ creatorId });
        } catch (err) {
            elevateError(err);
            throw new Error('Error during deleting welcome settings');
        }
    }

    private async ownerCreatorCheck(token: string, welcomeSettingsId: string) {
        const user = (await userService.getUserByToken(token)) as IUser;
        const welcomeSettings = (await this.model.findById(
            welcomeSettingsId
        )) as IWelcomeSettings;
        const creator = (await creatorService.getCreatorById(
            welcomeSettings.creatorId.toString()
        )) as ICreator;

        if (user.id.toString() !== creator.userId.toString()) {
            throw new Error('You are not the owner of this creator');
        }
    }
}

const welcomeSettingsService = new WelcomeSettingsService();
export default welcomeSettingsService;
