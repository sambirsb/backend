import authService from '../../services/AuthService';
import newSubsListsService from '../../services/NewSubsListsService';
import { elevateError } from '../../errors/elevateError';
import { ChangeNewSubsListInput } from '../../generated/graphql';

const newSubsListsMutationResolver = {
    Mutation: {
        async changeNewSubsList(
            _: never,
            { input }: { input: ChangeNewSubsListInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                return await newSubsListsService.changeNewSubsList(
                    token,
                    input
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default newSubsListsMutationResolver;
