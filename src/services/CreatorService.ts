import { Connection } from 'mongoose';
import { SEVEN_DAYS_AGO, TWELVE_HOURS_AGO } from '../constants/updateStats';
import CreatorModel from '../models/CreatorModel';
import userService from './UserService';
import promotionReactivatorService from './PromotionReactivatorService';
import fanNumberingService from './FanNumberingService';
import autoFollowService from './AutoFollowService';
import expiringFansService from './ExpiringFansService';
import displaySettingsService from './DisplaySettingsService';
import vaultMediaService from './vaultMediaService';
import fanSpendListsService from './FanSpendListsService';
import massMessagingService from './MassMessagingService';
import ppvMessageService from './pPVMessageService';
import displayColorsService from './DisplayColorsService';
import expiringFansMessageService from './ExpiringFansMessageService';
import mMMService from './MMMService';
import scriptService from './ScriptService';
import scriptFolderService from './ScriptFolderService';
import welcomeMessageService from './WelcomeMessageService';
import teamService from './TeamService';
import ppvFollowService from './pPVFollowService';
import visibilityService from './VisibilityService';
import welcomeSettingsService from './WelcomeSettingsService';
import updateScrapeService from './UpdateScrapeService';
import {
    checkCreatorOwner,
    adminRoleCheck,
    checkCreatorOwnerByExtension,
    newCreatorGenerator,
} from '../utils';
import { getPublicLibScraperData } from '../scraperUtils';
import { elevateError } from '../errors/elevateError';
import { ICreator } from '../types';
import {
    AppDataExtInput,
    ChangeCreatorAuthInput,
    CreatorForAddCreatorResponse,
} from '../generated/graphql';

class CreatorService {
    private model: typeof CreatorModel = CreatorModel;

    async getCreatorById(creatorId: string) {
        try {
            return await this.model.findById(creatorId);
        } catch (err) {
            elevateError(err);
        }
    }

    async getCreatorsByIds(
        creatorIds: string[],
        token: string
    ): Promise<ICreator[]> {
        try {
            await Promise.all(
                creatorIds.map((creatorId) =>
                    checkCreatorOwner(token, creatorId)
                )
            );

            return (await this.model.find({
                _id: { $in: creatorIds },
            })) as ICreator[];
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async getCreatorsByUserId(userId: string) {
        try {
            return (await this.model.find({ userId })) as ICreator[];
        } catch (err) {
            elevateError(err);
        }
    }

    async getCreatorIdsByUserId(userId: string): Promise<string[]> {
        try {
            const creators = await this.getCreatorsByUserId(userId);

            if (!creators) {
                return [];
            }

            return creators.map((creator) => creator.id);
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async getCreatorByAuthUser_Id(user_id: string) {
        try {
            return await this.model.findOne({
                'creatorAuth.user_id': user_id,
            });
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async getCreatorAuth(token: string, user_id: string) {
        try {
            await adminRoleCheck(token);
            const creator = (await this.getCreatorByAuthUser_Id(
                user_id
            )) as ICreator;
            await this.validateCreatorAction(token, creator.id);

            return creator.creatorAuth;
        } catch (err) {
            elevateError(err);
        }
    }

    async getCreatorAuthByCreatorId(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);
            const creator = (await this.model.findById(creatorId)) as ICreator;

            if (!creator) {
                throw new Error('Creator not found');
            }

            if (!creator.creatorAuth) {
                throw new Error('CreatorAuth is undefined');
            }

            return creator.creatorAuth;
        } catch (err) {
            elevateError(err);
        }
    }

    async getCreatorsForUpdateStats() {
        try {
            // return (await this.model.aggregate([
            //     {
            //         $match: {
            //             'creatorAuth.expiredAt': { $gt: new Date() },
            //             lastUpdatedDate: { $lt: TWELVE_HOURS_AGO },
            //         },
            //     },
            //     {
            //         $lookup: {
            //             from: 'User',
            //             localField: 'userId',
            //             foreignField: '_id',
            //             as: 'userDetails',
            //         },
            //     },
            //     { $unwind: '$userDetails' },
            //     {
            //         $match: {
            //             'userDetails.lastActivity': { $lt: SEVEN_DAYS_AGO },
            //         },
            //     },
            // ])) as ICreator[];
            return await this.model.find({
                'creatorAuth.expiredAt': { $gt: new Date() },
                lastUpdatedDate: { $lt: TWELVE_HOURS_AGO },
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async addCreator(
        token: string,
        link: string
    ): Promise<CreatorForAddCreatorResponse> {
        try {
            const user = await userService.getUserByToken(token);

            const { data } = await getPublicLibScraperData(link);

            const creatorInput = {
                link,
                userName: data.name,
                avatarURL: data.avatar,
                joinDate: data.joinDate,
                user_id: data.id.toString(),
            };

            return await newCreatorGenerator(user.id, creatorInput);
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async deleteCreator(token: string, creatorId: string) {
        try {
            const creator = await this.model.findById(creatorId);
            if (!creator) {
                throw new Error('Creator not found');
            }

            await this.validateCreatorAction(token, creatorId);

            await this.model.findByIdAndDelete(creatorId);
            await autoFollowService.deleteAutoFollowsByCreatorId(creatorId);
            await displaySettingsService.deleteDisplaySettingsByCreatorId(
                creatorId
            );
            await expiringFansService.deleteExpiringFansByCreatorId(creatorId);
            await fanNumberingService.deleteFanNumberingByCreatorId(creatorId);
            await ppvFollowService.deletePPVFollowsByCreatorId(creatorId);
            await promotionReactivatorService.deletePromotionReactivatorsByCreatorId(
                creatorId
            );
            await vaultMediaService.deleteVaultMediasByCreatorId(creatorId);
            await visibilityService.deleteVisibilitiesByCreatorId(creatorId);
            await welcomeSettingsService.deleteWelcomeSettingsByCreatorId(
                creatorId
            );
            await fanSpendListsService.deleteFanSpendListsByCreatorId(
                creatorId
            );
            await massMessagingService.deleteMassMessagingsByCreatorId(
                creatorId
            );
            await ppvMessageService.deletePpvMessagesByCreatorId(creatorId);

            await displayColorsService.deleteDisplayColorsByCreatorId(
                creatorId
            );
            await expiringFansMessageService.deleteExpiringFansMessagesByCreatorId(
                creatorId
            );
            await mMMService.deleteAllMassMessagesForCreatorId(creatorId);
            await scriptService.deleteAllScriptsByCreatorId(creatorId);
            await scriptFolderService.deleteAllScriptFoldersByCreatorId(
                creatorId
            );
            await welcomeMessageService.deleteAllWelcomeMessagesByCreatorId(
                creatorId
            );
            await teamService.removeCreatorFromAllTeams(creatorId);
            await teamService.removeCreatorFromAllTeamMembers(creatorId);
            await teamService.removeTeamMembersByCreatorId(creatorId);
        } catch (err) {
            console.error('Error during the delete operation:', err);
            throw err;
        }
    }

    async changeCreatorAuth(
        token: string,
        input: ChangeCreatorAuthInput,
        sta: Connection
    ) {
        await adminRoleCheck(token);

        return await this.updateCreatorAuthWithoutCheck(token, input, sta);
    }

    async changeCreatorAuthByExtension(
        token: string,
        input: ChangeCreatorAuthInput,
        sta: Connection
    ) {
        return await this.updateCreatorAuthWithoutCheck(token, input, sta);
    }

    async updateCreatorAuthWithoutCheck(
        token: string,
        input: ChangeCreatorAuthInput,
        sta: Connection
    ) {
        try {
            const creator = (await this.getCreatorByAuthUser_Id(
                input.user_id
            )) as ICreator;

            if (!creator.creatorAuth) {
                creator.creatorAuth = {
                    user_agent: '',
                    x_bc: '',
                    user_id: '',
                    cookie: '',
                    expiredAt: new Date(),
                };
            }

            creator.creatorAuth = {
                ...input
            };

            await creator.save();

            if (creator.creatorAuth.cookie)
                await updateScrapeService.updateCreatorsStats(
                    token,
                    [creator.id],
                    sta
                );

            return creator;
        } catch (err) {
            elevateError(err);
        }
    }

    async changeAppAuthExtension(token: string, input: AppDataExtInput) {
        await checkCreatorOwnerByExtension(token, input.user_id);

        return await this.updateAppAuthExtension(input);
    }

    async updateAppAuthExtension(input: AppDataExtInput) {
        try {
            const creator = (await this.getCreatorByAuthUser_Id(
                input.user_id
            )) as ICreator;

            if (!creator.appAuth) {
                creator.appAuth = {
                    sess: '',
                    bcTokenSha: '',
                };
            }

            creator.appAuth = {
                ...input,
            };

            await creator.save();

            return creator;
        } catch (err) {
            elevateError(err);
        }
    }

    private async validateCreatorAction(token: string, creatorId: string) {
        const user = await userService.getUserByToken(token);

        if (!user) {
            throw new Error('User not found');
        }

        const creator = (await this.getCreatorById(creatorId)) as ICreator;

        if (user.id !== creator.userId.toString()) {
            throw new Error(
                'You are not allowed to perform this action on this creator'
            );
        }

        return creator;
    }
}

const creatorService = new CreatorService();
export default creatorService;
