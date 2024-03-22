import DisplaySettingsModel from '../models/DisplaySettingsModel';
import userService from './UserService';
import creatorService from './CreatorService';
import { validateChangeDisplaySettings } from '../validation/displaySettingsValidation';
import { elevateError } from '../errors/elevateError';
import { IUser, ICreator, IDisplaySettings } from '../types';
import { ChangeDisplaySettingsInput } from '../generated/graphql';

class DisplaySettingsService {
    private model: typeof DisplaySettingsModel = DisplaySettingsModel;

    async getDSById(displaySettingsId: string) {
        try {
            return (await this.model.findById(
                displaySettingsId
            )) as IDisplaySettings;
        } catch (err) {
            elevateError(err);
        }
    }

    async getDSByCreatorId(token: string, creatorId: string) {
        try {
            const displaySettings = (await this.model.findOne({
                creatorId: creatorId,
            })) as IDisplaySettings;
            if (!displaySettings)
                throw new Error('Display settings is undefined');

            await this.ownerCreatorCheck(token, displaySettings._id.toString());

            return displaySettings;
        } catch (err) {
            elevateError(err);
        }
    }

    async createDisplaySettings(creatorId: string, createdBy: string) {
        try {
            return await this.model.create({
                creatorId,
                createdBy,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changeDisplaySettings(
        token: string,
        input: ChangeDisplaySettingsInput
    ) {
        try {
            await this.ownerCreatorCheck(token, input.id);
            await validateChangeDisplaySettings(input);

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

    async deleteDisplaySettingsByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({ creatorId });
        } catch (err) {
            elevateError(err);
        }
    }

    private async ownerCreatorCheck(token: string, displaySettingsId: string) {
        const user = (await userService.getUserByToken(token)) as IUser;
        const displaySettings = (await this.model.findById(
            displaySettingsId
        )) as IDisplaySettings;
        const creator = (await creatorService.getCreatorById(
            displaySettings.creatorId.toString()
        )) as ICreator;

        if (user.id.toString() !== creator.userId.toString()) {
            throw new Error('You are not the owner of this creator');
        }
    }
}

const displaySettingsService = new DisplaySettingsService();
export default displaySettingsService;
