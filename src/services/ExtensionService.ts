import { MIN_KEY_LETTER } from '../constants/others';
import authService from './AuthService';
import userService from './UserService';
import creatorService from './CreatorService';
import visibilityService from './VisibilityService';
import scriptService from './ScriptService';
import vaultMediaService from './vaultMediaService';
import proxyService from './ProxyService';
import displaySettingsService from './DisplaySettingsService';
import displayColorsService from './DisplayColorsService';
import teamService from './TeamService';
import {
    checkCreatorOwnerByExtension,
    sendLoginExtensionEmail,
    newCreatorGenerator,
    checkCreatorOwner,
} from '../utils';
import { validateAddPreferences } from '../validation/creatorValidation';
import { stringLengthValidation } from '../validation/stringLengthValidation';
import { elevateError } from '../errors/elevateError';
import { ICreator, IScript } from '../types';
import {
    AddCreatorExtensionInput,
    AddPreferencesInput,
    GetPreferencesByChatterIdExtensionInput,
    GetScriptsByKeyLettersInput,
    LoginExtensionInput,
    UserDto,
    VaultMediaExtInput,
} from '../generated/graphql';

class ExtensionService {
    async loginExtension(input: LoginExtensionInput) {
        try {
            const user = (await userService.authenticateByExtension(
                input.email,
                input.password
            )) as UserDto;

            if (!user) {
                throw new Error('Authentication failed');
            }

            const creator = (await creatorService.getCreatorByAuthUser_Id(
                input.user_id
            )) as ICreator;

            if (!creator) {
                const extensionToken = authService.generateIdExtensionToken(
                    user.id
                );
                return {
                    token: extensionToken,
                    visibilitySettings: null,
                };
            }

            const visibilitySettings =
                await visibilityService.getCreatorVisibilityForExtension(
                    creator.id
                );
            const extensionToken = authService.generateExtensionToken(
                user.id,
                creator.id
            );

            await checkCreatorOwnerByExtension(extensionToken, input.user_id);
            await sendLoginExtensionEmail(input.email);

            const teamMemberId = await teamService.getTeamMemberIdByExtension(
                user.id,
                creator.id
            );

            return {
                token: extensionToken,
                visibilitySettings,
                teamMemberId,
            };
        } catch (err) {
            elevateError(err);
        }
    }

    async addCreatorByExtension(
        token: string,
        input: AddCreatorExtensionInput
    ) {
        try {
            const user =
                await userService.getUserByGenerateIdExtensionToken(token);
            const creator = await newCreatorGenerator(user.id, input);

            const visibilitySettings =
                await visibilityService.getCreatorVisibilityForExtension(
                    creator.id
                );
            const extensionToken = await authService.generateExtensionToken(
                user.id,
                creator.id
            );

            const teamMemberId = await teamService.getTeamMemberIdByExtension(
                user.id,
                creator.id
            );

            return { token: extensionToken, visibilitySettings, teamMemberId };
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async addPreferences(token: string, input: AddPreferencesInput) {
        try {
            const creator = (await checkCreatorOwnerByExtension(
                token,
                input.user_id
            )) as ICreator;
            await validateAddPreferences(input);

            const newPreferences =
                input.preferencesText?.map((text) => ({
                    text: text,
                    subscriberId: input.chatterId,
                })) || [];

            creator.preferences = creator.preferences || [];
            creator.preferences = creator.preferences.filter(
                (p) => p?.subscriberId !== input.chatterId
            );
            creator.preferences.push(...newPreferences);

            await creator.save();

            return creator.preferences.filter(
                (p) => p?.subscriberId === input.chatterId
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async getDisplaySettingsExtension(user_id: string, token: string) {
        try {
            const creator = (await checkCreatorOwnerByExtension(
                token,
                user_id
            )) as ICreator;

            const displaySettings =
                await displaySettingsService.getDSByCreatorId(
                    token,
                    creator.id
                );

            return displaySettings;
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllDisplayColorsExtension(user_id: string, token: string) {
        try {
            const creator = (await checkCreatorOwnerByExtension(
                token,
                user_id
            )) as ICreator;

            return await displayColorsService.getAllDisplayColors(
                token,
                creator.id
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async getExtensionTokenThrowToken(token: string, creatorId: string) {
        try {
            const userId = authService.getUserIdFromToken(token);
            if (!userId) {
                throw new Error('User not found.');
            }

            const newExtensionToken = authService.generateExtensionToken(
                userId,
                creatorId
            );

            const creator = (await checkCreatorOwner(
                newExtensionToken,
                creatorId
            )) as ICreator;

            const visibilitySettings =
                await visibilityService.getCreatorVisibilityForExtension(
                    creator.id
                );

            return {
                token: newExtensionToken,
                visibilitySettings,
            };
        } catch (err) {
            elevateError(err);
        }
    }

    async getPreferencesByChatterIdExtension(
        token: string,
        input: GetPreferencesByChatterIdExtensionInput
    ) {
        try {
            const creator = (await checkCreatorOwnerByExtension(
                token,
                input.user_id
            )) as ICreator;

            const preferences =
                creator && creator.preferences
                    ? creator.preferences.filter(
                          (preference) =>
                              preference?.subscriberId === input.chatterId
                      )
                    : [];

            const creatorWithoutPreferences = {
                id: creator.id,
                link: creator.link,
                userId: creator.userId,
                license: creator.license,
                userName: creator.userName,
                avatarURL: creator.avatarURL,
                joinDate: creator.joinDate,
                creatorAuth: creator.creatorAuth,
            };

            return {
                preferences,
                chatter: creatorWithoutPreferences,
            };
        } catch (err) {
            elevateError(err);
        }
    }

    async getVisibilityByTokenExt(token: string, user_id: string) {
        try {
            const creator = (await checkCreatorOwnerByExtension(
                token,
                user_id
            )) as ICreator;
            const visibilitySettings =
                await visibilityService.getCreatorVisibilityForExtension(
                    creator.id
                );

            return {
                user_id,
                visibilitySetting: visibilitySettings,
            };
        } catch (err) {
            elevateError(err);
        }
    }

    async getScriptsByKeyLetters(
        token: string,
        input: GetScriptsByKeyLettersInput
    ) {
        try {
            const { user_id, keyLetters } = input;
            await stringLengthValidation(keyLetters, MIN_KEY_LETTER);

            const creator = (await checkCreatorOwnerByExtension(
                token,
                user_id
            )) as ICreator;

            return await scriptService.getScriptsByKeyLettersExt(
                creator.id,
                keyLetters
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllScripts(token: string, user_id: string) {
        try {
            const creator = (await checkCreatorOwnerByExtension(
                token,
                user_id
            )) as ICreator;

            const scripts = (await scriptService.getAllScriptsExt(
                creator.id
            )) as IScript[];

            return scripts.map((script) => ({
                name: script.name,
                scriptId: script.id.toString(),
            }));
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllCreatorVaultMedia(token: string, user_id: string) {
        try {
            const creator = (await checkCreatorOwnerByExtension(
                token,
                user_id
            )) as ICreator;

            return await vaultMediaService.getAllCreatorVaultMediaExt(
                creator.id
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async addVaultMedia(token: string, input: VaultMediaExtInput) {
        try {
            const creator = (await checkCreatorOwnerByExtension(
                token,
                input.user_id
            )) as ICreator;

            const user = (await userService.getUserByExtensionToken(
                token
            )) as UserDto;

            return await vaultMediaService.addVaultMedia({
                media_id: input.media_id,
                fileName: input.fileName,
                price: input.price,
                creatorId: creator.id.toString(),
                scriptId: input.scriptId?.toString(),
                createdBy: user.id.toString(),
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async getCreatorProxy(token: string, user_id: string) {
        try {
            const creator = (await checkCreatorOwnerByExtension(
                token,
                user_id
            )) as ICreator;

            return await proxyService.getCreatorProxyExt(creator.id);
        } catch (err) {
            elevateError(err);
        }
    }

    async getAppExtensionData(token: string, creatorId: string) {
        try {
            const user = (await userService.getUserByToken(token)) as UserDto;

            if (!user) {
                throw new Error('Authentication failed');
            }

            const creator = (await creatorService.getCreatorById(
                creatorId
            )) as ICreator;

            const visibilitySettings =
                await visibilityService.getCreatorVisibilityForExtension(
                    creator.id
                );
            const extensionToken = authService.generateExtensionToken(
                user.id,
                creator.id
            );

            await checkCreatorOwner(extensionToken, creatorId);

            const teamMemberId = await teamService.getTeamMemberIdByExtension(
                user.id,
                creator.id
            );

            return {
                token: extensionToken,
                visibilitySettings,
                teamMemberId,
            };
        } catch (err) {
            elevateError(err);
        }
    }
}
const extensionService = new ExtensionService();
export default extensionService;
