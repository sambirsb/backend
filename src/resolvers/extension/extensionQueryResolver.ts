import authService from '../../services/AuthService';
import extensionService from '../../services/ExtensionService';
import { elevateError } from '../../errors/elevateError';
import { IProxy } from '../../types';
import {
    GetPreferencesByChatterIdExtensionInput,
    GetScriptsByKeyLettersInput,
} from '../../generated/graphql';

const extensionQueryResolver = {
    Query: {
        async getExtensionTokenThrowToken(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await extensionService.getExtensionTokenThrowToken(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
                throw err;
            }
        },

        async getPreferencesByChatterIdExtension(
            _: never,
            { input }: { input: GetPreferencesByChatterIdExtensionInput },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                return await extensionService.getPreferencesByChatterIdExtension(
                    token,
                    input
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getVisibilitySettingByTokenExtension(
            _: never,
            { user_id }: { user_id: string },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                return await extensionService.getVisibilityByTokenExt(
                    token,
                    user_id
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getScriptsByKeyLettersExtension(
            _: never,
            { input }: { input: GetScriptsByKeyLettersInput },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                return await extensionService.getScriptsByKeyLetters(
                    token,
                    input
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getAllScriptsExtension(
            _: never,
            { user_id }: { user_id: string },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                return await extensionService.getAllScripts(token, user_id);
            } catch (err) {
                elevateError(err);
            }
        },

        async getAllCreatorVaultMediaExtension(
            _: never,
            { user_id }: { user_id: string },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                return await extensionService.getAllCreatorVaultMedia(
                    token,
                    user_id
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getCreatorProxyExtension(
            _: never,
            { user_id }: { user_id: string },
            context: any
        ): Promise<IProxy> {
            try {
                const token = authService.checkExtToken(context.token);

                const proxy = await extensionService.getCreatorProxy(
                    token,
                    user_id
                );

                if (!proxy) {
                    throw new Error('Proxy not found');
                }

                return proxy;
            } catch (err) {
                console.error('Error:', err);
                throw err;
            }
        },

        async getDisplaySettingsExtension(
            _: never,
            { user_id }: { user_id: string },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                return await extensionService.getDisplaySettingsExtension(
                    user_id,
                    token
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getAllDisplayColorsExtension(
            _: never,
            { user_id }: { user_id: string },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                return await extensionService.getAllDisplayColorsExtension(
                    user_id,
                    token
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getAppExtensionData(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await extensionService.getAppExtensionData(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default extensionQueryResolver;
