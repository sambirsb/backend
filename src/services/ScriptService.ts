import ScriptModel from '../models/ScriptModel';
import authService from './AuthService';
import creatorService from './CreatorService';
import scriptFolderService from './ScriptFolderService';
import teamService from './TeamService';
import { getNextNumber } from '../utils';
import {
    validateCreateScript,
    validateUpdateScript,
} from '../validation/scriptValidation';
import { elevateError } from '../errors/elevateError';
import { ICreator, IScript } from '../types';
import { CreateScriptInput, UpdateScriptInput } from '../generated/graphql';

class ScriptService {
    private model: typeof ScriptModel = ScriptModel;

    async getScriptById(token: string, id: string) {
        try {
            const script = (await this.model.findById(id)) as IScript;

            if (!script) {
                throw new Error('Script not found');
            }

            await this.checkCreatorOwner(token, script.scriptFolder.toString());

            return script;
        } catch (err) {
            elevateError(err);
        }
    }

    async getScriptsByKeyLettersExt(creatorId: string, keyLetters: string) {
        try {
            const scriptFolderIds =
                await scriptFolderService.getCreatorScriptFolderIds(creatorId);
            const regex = new RegExp(keyLetters, 'i');

            return await ScriptModel.find({
                scriptFolder: { $in: scriptFolderIds },
                name: { $regex: regex },
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllScriptsExt(creatorId: string) {
        try {
            const scriptFolderIds =
                await scriptFolderService.getCreatorScriptFolderIds(creatorId);

            return await ScriptModel.find({
                scriptFolder: { $in: scriptFolderIds },
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async createScript(token: string, input: CreateScriptInput) {
        try {
            await validateCreateScript(input);
            await this.checkCreatorOwner(token, input.scriptFolder);
            const nextNumber = await getNextNumber(
                ScriptModel,
                'scriptFolder',
                input.scriptFolder,
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

    async changeScript(token: string, input: UpdateScriptInput) {
        try {
            await validateUpdateScript(input);
            const existScript = (await this.model.findById(
                input.id
            )) as IScript;
            await this.checkCreatorOwner(
                token,
                existScript.scriptFolder.toString()
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

    async deleteScript(token: string, id: string) {
        try {
            const existScript = (await this.model.findById(id)) as IScript;
            await this.checkCreatorOwner(
                token,
                existScript.scriptFolder.toString()
            );

            return await this.model.findOneAndDelete({
                _id: id,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteAllScriptsByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({
                'scripts.creatorId': creatorId,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    private async checkCreatorOwner(token: string, scriptFolder: string) {
        const userId = authService.getUserIdFromToken(token);

        const existScriptFolder = await scriptFolderService.getScriptFolderById(
            token,
            scriptFolder
        );

        if (!existScriptFolder) {
            throw new Error('Script folder not found');
        }

        const creator = (await creatorService.getCreatorById(
            existScriptFolder.creatorId.toString()
        )) as ICreator;

        if (creator.userId.toString() === userId) {
            return;
        }

        try {
            await teamService.getTeamMemberIdByExtension(userId, creator.id);
        } catch (err) {
            throw new Error(
                'You are not owner of this creator and not a team member with access'
            );
        }
    }
}

const scriptService = new ScriptService();
export default scriptService;
