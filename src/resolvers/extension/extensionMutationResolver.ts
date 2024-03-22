import authService from '../../services/AuthService';
import extensionService from '../../services/ExtensionService';
import creatorService from '../../services/CreatorService';
import { elevateError } from '../../errors/elevateError';
import { sendChangeCreatorAuthByExtensionEmail } from '../../utils';
import { ICreator } from '../../types';
import {
    AddCreatorExtensionInput,
    AddPreferencesInput,
    AppDataExtInput,
    ChangeCreatorAuthInput,
    LoginExtensionInput,
    VaultMediaExtInput,
} from '../../generated/graphql';

const extensionMutationResolver = {
    Mutation: {
        async loginExtension(
            _: never,
            { input }: { input: LoginExtensionInput }
        ) {
            try {
                const result = await extensionService.loginExtension(input);
                if (!result) {
                    throw new Error('Login failed');
                }

                const { token, visibilitySettings, teamMemberId } = result;

                return {
                    token,
                    visibilitySettings,
                    teamMemberId,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async addCreatorExtension(
            _: never,
            { input }: { input: AddCreatorExtensionInput },
            context: any
        ) {
            try {
                const token = authService.checkGenerateIdExtensionToken(
                    context.token
                );

                return await extensionService.addCreatorByExtension(
                    token,
                    input
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async changeCreatorAuthByExtension(
            _: never,
            { input }: { input: ChangeCreatorAuthInput },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                const creator =
                    (await creatorService.changeCreatorAuthByExtension(
                        token,
                        input,
                        context.statConnection
                    )) as ICreator;

                await sendChangeCreatorAuthByExtensionEmail(context.token);

                return `Creator auth for creator with id: ${creator.id} successfully changed`;
            } catch (err) {
                elevateError(err);
            }
        },

        async addPreferences(
            _: never,
            { input }: { input: AddPreferencesInput },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                const preferences = await extensionService.addPreferences(
                    token,
                    input
                );

                return {
                    message: `Preferences for chatter with id: ${input.chatterId} successfully added`,
                    preferences,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async addVaultMediaExtension(
            _: never,
            { input }: { input: VaultMediaExtInput },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                const vaultMedia = await extensionService.addVaultMedia(
                    token,
                    input
                );

                if (!vaultMedia) {
                    throw new Error('Failed to add vault media');
                }

                return {
                    message: `Vault media with id: ${vaultMedia.id} successfully added`,
                    vaultMedia,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async changeAppAuthExtension(
            _: never,
            { input }: { input: AppDataExtInput },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);
                const creator = (await creatorService.changeAppAuthExtension(
                    token,
                    input
                )) as ICreator;

                return `App auth for creator with id: ${creator.id} successfully changed`;
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default extensionMutationResolver;
