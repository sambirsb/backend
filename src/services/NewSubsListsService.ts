import creatorService from './CreatorService';
import { getAllCollectionLists } from '../scraperUtils';
import { checkCreatorOwner } from '../utils/creators/checkCreatorOwner';
import { elevateError } from '../errors/elevateError';
import { ICreator } from '../types';
import { ChangeNewSubsListInput, CreatorAuth } from '../generated/graphql';

class NewSubsListsService {
    async getAllLists(token: string, creatorId: string) {
        try {
            const creatorAuth = (await creatorService.getCreatorAuthByCreatorId(
                token,
                creatorId
            )) as CreatorAuth;

            return await getAllCollectionLists(creatorAuth);
        } catch (err) {
            elevateError(err);
        }
    }

    async changeNewSubsList(token: string, input: ChangeNewSubsListInput) {
        try {
            await checkCreatorOwner(token, input.creatorId);
            const creator = (await creatorService.getCreatorById(
                input.creatorId
            )) as ICreator;

            creator.collectionListId = input.listId;
            // TODO в майбутньому додати перевірку на те, що такий listId існує (коли буде підключена дб)
            await creator.save();

            return creator;
        } catch (err) {
            elevateError(err);
        }
    }
}
const newSubsListsService = new NewSubsListsService();
export default newSubsListsService;
