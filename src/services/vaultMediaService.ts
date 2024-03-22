import VaultMediaModel from '../models/VaultMediaModel';
import { checkCreatorOwner } from '../utils/creators/checkCreatorOwner';
import { validateVaultMediaExtInput } from '../validation/vaultMediaValidation';
import { elevateError } from '../errors/elevateError';
import { AddVaultMediaServiceInput } from '../types';

class VaultMediaService {
    private model: typeof VaultMediaModel = VaultMediaModel;

    async getAllCreatorVaultMedia(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            return await this.model.find({ creatorId });
        } catch (err) {
            elevateError(err);
        }
    }

    async getAllCreatorVaultMediaExt(creatorId: string) {
        try {
            return await this.model.find({ creatorId });
        } catch (err) {
            elevateError(err);
        }
    }

    async addVaultMedia(data: AddVaultMediaServiceInput) {
        try {
            await validateVaultMediaExtInput(data);

            return await this.model.findOneAndUpdate(
                { media_id: data.media_id, creatorId: data.creatorId },
                data,
                { new: true, upsert: true }
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteVaultMediasByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({ creatorId });
        } catch (err) {
            elevateError(err);
        }
    }
}

const vaultMediaService = new VaultMediaService();
export default vaultMediaService;
