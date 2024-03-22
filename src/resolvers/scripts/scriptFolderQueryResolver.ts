import authService from '../../services/AuthService';
import scriptFolderService from '../../services/ScriptFolderService';
import { elevateError } from '../../errors/elevateError';

const scriptFolderQueryResolver = {
    Query: {
        async getScriptFolderById(
            _: never,
            { id }: { id: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await scriptFolderService.getScriptFolderById(token, id);
            } catch (err) {
                elevateError(err);
            }
        },

        async getCreatorScriptFolders(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await scriptFolderService.getCreatorScriptFolders(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default scriptFolderQueryResolver;
