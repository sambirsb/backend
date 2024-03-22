import ScriptFolderModel from '../models/ScriptFolderModel';
import ScriptModel from '../models/ScriptModel';
import { getNextNumber, checkCreatorOwner } from '../utils';
import {
    validateCreateScriptFolder,
    validateUpdateScriptFolder,
} from '../validation/scriptFolderValidation';
import { elevateError } from '../errors/elevateError';
import { IScriptFolder, IScript } from '../types';
import {
    CreateScriptFolderInput,
    UpdateScriptFolderInput,
} from '../generated/graphql';

class ScriptFolderService {
    private model: typeof ScriptFolderModel = ScriptFolderModel;

    async getScriptFolderById(token: string, id: string) {
        try {
            const scriptFolder = (await this.model.findById(
                id
            )) as IScriptFolder;

            if (!scriptFolder) {
                throw new Error('Script folder not found');
            }

            await checkCreatorOwner(token, scriptFolder.creatorId.toString());

            return scriptFolder;
        } catch (err) {
            elevateError(err);
        }
    }

    async getCreatorScriptFolders(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            const scriptFolders = (await this.model
                .find({ creatorId })
                .sort({ number: 1 })
                .lean()) as IScriptFolder[];

            const enrichedScriptFolders = await Promise.all(
                scriptFolders.map(async (folder) => {
                    const scripts = (await ScriptModel.find({
                        scriptFolder: folder._id,
                    })
                        .sort({ number: 1 })
                        .lean()) as IScript[];

                    const transformedScripts = scripts.map((script) => ({
                        id: script._id.toString(),
                        name: script.name,
                        text: script.text,
                        fallbackName: script.fallbackName,
                        number: script.number,
                    }));

                    return {
                        id: folder._id.toString(),
                        folderName: folder.folderName,
                        number: folder.number,
                        creatorId: folder.creatorId,
                        scripts: transformedScripts,
                    };
                })
            );

            return enrichedScriptFolders.map((folder) => ({
                scriptFolders: folder,
            }));
        } catch (err) {
            elevateError(err);
        }
    }

    async getCreatorScriptFolderIds(creatorId: string) {
        try {
            return await this.model
                .find({ creatorId })
                .sort({ number: 1 })
                .distinct('_id');
        } catch (err) {
            elevateError(err);
        }
    }

    async createScriptFolder(token: string, input: CreateScriptFolderInput) {
        try {
            await validateCreateScriptFolder(input);

            await checkCreatorOwner(token, input.creatorId);

            const nextNumber = await getNextNumber(
                ScriptFolderModel,
                'creatorId',
                input.creatorId,
                'number'
            );

            return await this.model.create({
                ...input,
                number: nextNumber,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changeScriptFolder(token: string, input: UpdateScriptFolderInput) {
        try {
            await validateUpdateScriptFolder(input);

            await checkCreatorOwner(token, input.creatorId);

            return await this.model.findOneAndUpdate(
                {
                    _id: input.id,
                },
                {
                    ...input,
                }
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteScriptFolder(token: string, id: string) {
        try {
            const scriptFolder = (await this.model.findById(
                id
            )) as IScriptFolder;

            if (!scriptFolder) {
                throw new Error('Script folder not found');
            }

            await checkCreatorOwner(token, scriptFolder.creatorId.toString());

            return await this.model.deleteOne({
                _id: id,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteAllScriptFoldersByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({
                'scripts.creatorId': creatorId,
            });
        } catch (err) {
            elevateError(err);
        }
    }
}

const scriptFolderService = new ScriptFolderService();
export default scriptFolderService;
