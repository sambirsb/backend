import DisplayColorsModel from '../models/DisplayColors';
import DisplaySettingsModel from '../models/DisplaySettingsModel';
import userService from './UserService';
import displaySettingsService from './DisplaySettingsService';
import { checkCreatorOwner } from '../utils/creators/checkCreatorOwner';
import { elevateError } from '../errors/elevateError';
import { IDisplaySettings, IDisplayColors } from '../types';
import {
    ChangeDisplayColorInput,
    CreateDisplayColorInput,
} from '../generated/graphql';

class DisplayColorsService {
    private model: typeof DisplayColorsModel = DisplayColorsModel;

    async getOneDisplayColor(token: string, displayColorId: string) {
        try {
            const displayColor = (await this.model.findById(
                displayColorId
            )) as IDisplayColors;
            await this.ownerCreatorCheck(
                token,
                displayColor.displaySettings.toString()
            );

            return displayColor;
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllDisplayColors(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            const displaySettings = (await DisplaySettingsModel.findOne({
                creatorId,
            })) as IDisplaySettings;

            if (!displaySettings)
                throw new Error('DisplaySettings Is undefined');

            return await this.model.find({
                displaySettings: displaySettings._id,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async createDisplayColor(token: string, input: CreateDisplayColorInput) {
        try {
            const displaySettings = await displaySettingsService.getDSById(
                input.displaySettings
            );

            if (!displaySettings)
                throw new Error('DisplaySettings Is undefined');

            await this.ownerCreatorCheck(token, displaySettings._id.toString());

            return await this.model.create({
                ...input,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changeDisplayColor(token: string, input: ChangeDisplayColorInput) {
        try {
            const displayColor = (await this.model.findById(
                input.id
            )) as IDisplayColors;
            await this.ownerCreatorCheck(
                token,
                displayColor.displaySettings._id.toString()
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

    async deleteDisplayColor(token: string, displaySettingsId: string) {
        try {
            const displayColor = (await this.model.findById(
                displaySettingsId
            )) as IDisplayColors;
            await this.ownerCreatorCheck(
                token,
                displayColor.displaySettings.toString()
            );

            return await this.model.findByIdAndDelete(displaySettingsId);
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteDisplayColorsByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({
                'displaySettings.creatorId': creatorId,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    private async ownerCreatorCheck(token: string, displaySettingsId: string) {
        const user = await userService.getUserByToken(token);
        const displaySettings =
            await displaySettingsService.getDSById(displaySettingsId);

        if (!displaySettings) throw new Error('Display settings is undefined');

        if (user.id !== displaySettings.createdBy.toString()) {
            throw new Error('You are not the owner of this display settings.');
        }
    }
}

const displayColorsService = new DisplayColorsService();
export default displayColorsService;
