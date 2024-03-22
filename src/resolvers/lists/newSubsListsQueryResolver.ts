import authService from '../../services/AuthService';
import creatorService from '../../services/CreatorService';
import newSubsListsService from '../../services/NewSubsListsService';
import { elevateError } from '../../errors/elevateError';
import { ICreator } from '../../types';

const newSubsListsQueryResolver = {
    Query: {
        async getNewSubsLists(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                const collectionLists = await newSubsListsService.getAllLists(
                    token,
                    creatorId
                );
                const creator = (await creatorService.getCreatorById(
                    creatorId
                )) as ICreator;

                return {
                    collectionLists,
                    collectionListId: creator.collectionListId,
                };
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default newSubsListsQueryResolver;
