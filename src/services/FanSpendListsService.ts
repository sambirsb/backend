import FanSpendListsModel from '../models/FanSpendsLists';
import IFanSpendLists from '../types/IFanSpendLists';
import { checkCreatorOwner } from '../utils/creators/checkCreatorOwner';
import {
    validateChangeFanSpendLists,
    validateCreateFanSpendLists,
} from '../validation/fanSpendListsValidation';
import { elevateError } from '../errors/elevateError';
import {
    ChangeFanSpendListsInput,
    CreateFanSpendListsInput,
} from '../generated/graphql';

class FanSpendListsService {
    private model: typeof FanSpendListsModel = FanSpendListsModel;

    async getCreatorFanSpendLists(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            return await this.model.find({ creatorId });
        } catch (err) {
            elevateError(err);
        }
    }

    async getFanSpendListsById(token: string, id: string) {
        try {
            const fanSpendList = (await this.model.findById(
                id
            )) as IFanSpendLists;

            await checkCreatorOwner(token, fanSpendList.creatorId.toString());

            return fanSpendList;
        } catch (err) {
            elevateError(err);
        }
    }

    async createFanSpendLists(token: string, input: CreateFanSpendListsInput) {
        try {
            await validateCreateFanSpendLists(input);
            await checkCreatorOwner(token, input.creatorId);

            return await this.model.create({
                ...input,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async changeFanSpendLists(token: string, input: ChangeFanSpendListsInput) {
        try {
            await validateChangeFanSpendLists(input);
            await checkCreatorOwner(token, input.creatorId);

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

    async deleteFanSpendLists(token: string, id: string) {
        try {
            const fanSpendList = (await this.model.findById(
                id
            )) as IFanSpendLists;
            await checkCreatorOwner(token, fanSpendList.creatorId.toString());
            await this.model.findByIdAndDelete(id);

            return 'Fan spend List successfully deleted';
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteFanSpendListsByCreatorId(creatorId: string) {
        try {
            return await this.model.deleteMany({ creatorId });
        } catch (err) {
            elevateError(err);
        }
    }
}
const fanSpendListsService = new FanSpendListsService();
export default fanSpendListsService;
