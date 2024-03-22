import authService from '../../services/AuthService';
import creatorService from '../../services/CreatorService';
import { elevateError } from '../../errors/elevateError';
import { ChangeCreatorAuthInput } from '../../generated/graphql';
import { ICreator } from '../../types';

const creatorMutationResolver = {
    Mutation: {
        async addCreator(_: never, { link }: { link: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);
                const creator = await creatorService.addCreator(token, link);

                return {
                    message: `Creator with link: ${creator.link} successfully added`,
                    creator,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async deleteCreator(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                await creatorService.deleteCreator(token, creatorId);

                return {
                    message: `Creator with id: ${creatorId} successfully deleted`,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async changeCreatorAuth(
            _: never,
            { input }: { input: ChangeCreatorAuthInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const creator = (await creatorService.changeCreatorAuth(
                    token,
                    input,
                    context.statConnection
                )) as ICreator;

                return `Creator auth for creator with id: ${creator.id} successfully changed`;
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default creatorMutationResolver;
