import authService from '../../services/AuthService';
import ppvMessageService from '../../services/pPVMessageService';
import { elevateError } from '../../errors/elevateError';
import IPPVMessage from '../../types/IPPVMessage';
import {
    ChangeMassMessageInput,
    CreatePpvMessageInput,
} from '../../generated/graphql';

const pPVMessageMutationResolver = {
    Mutation: {
        async createPPVMessage(
            _: never,
            { input }: { input: CreatePpvMessageInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const pPVMessage = (await ppvMessageService.createPPVMessage(
                    token,
                    input
                )) as IPPVMessage;

                return {
                    message: `PPVMessage with id: ${pPVMessage.id} was created successfully.`,
                    pPVMessage,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async changePPVMessage(
            _: never,
            { input }: { input: ChangeMassMessageInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const pPVMessage = (await ppvMessageService.changePPVMessage(
                    token,
                    input
                )) as IPPVMessage;

                return {
                    message: `PPVMessage with id: ${pPVMessage.id} was changed successfully.`,
                    pPVMessage,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async deletePPVMessage(
            _: never,
            { pPVMessageId }: { pPVMessageId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                await ppvMessageService.deletePPVMessage(token, pPVMessageId);

                return `PPVMessage with id: ${pPVMessageId} was deleted successfully.`;
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default pPVMessageMutationResolver;
