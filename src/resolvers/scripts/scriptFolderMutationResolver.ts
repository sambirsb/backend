import authService from '../../services/AuthService';
import scriptFolderService from '../../services/ScriptFolderService';
import { elevateError } from '../../errors/elevateError';
import {
    CreateScriptFolderInput,
    UpdateScriptFolderInput,
} from '../../generated/graphql';

const scriptFolderMutationResolver = {
    Mutation: {
        async createScriptFolder(
            _: never,
            { input }: { input: CreateScriptFolderInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const scriptFolder =
                    await scriptFolderService.createScriptFolder(token, input);

                if (!scriptFolder) {
                    throw new Error('Script folder not found');
                }

                return {
                    message: `Script folder with name: ${scriptFolder.folderName} successfully created`,
                    scriptFolder,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async changeScriptFolder(
            _: never,
            { input }: { input: UpdateScriptFolderInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const scriptFolder =
                    await scriptFolderService.changeScriptFolder(token, input);

                return {
                    message: `Script folder with id: ${input.id} successfully changed`,
                    scriptFolder,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async deleteScriptFolder(
            _: never,
            { id }: { id: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                await scriptFolderService.deleteScriptFolder(token, id);

                return `Script folder with id: ${id} successfully deleted`;
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default scriptFolderMutationResolver;
