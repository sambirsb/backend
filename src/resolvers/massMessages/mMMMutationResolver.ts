import authService from '../../services/AuthService';
import mMMService from '../../services/MMMService';
import { elevateError } from '../../errors/elevateError';
import { IMMM } from '../../types';
import {
    ChangeMassMessageInput,
    CreateMassMessageInput,
} from '../../generated/graphql';

const mMMMutationResolver = {
    Mutation: {
        async createMassMessage(
            _: never,
            { input }: { input: CreateMassMessageInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const massMessage = (await mMMService.createMassMessage(
                    token,
                    input
                )) as IMMM;

                return {
                    message: `Mass message with ${massMessage.id} was created successfully.`,
                    massMessage,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async changeMassMessage(
            _: never,
            { input }: { input: ChangeMassMessageInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const massMessage = (await mMMService.changeMassMessage(
                    token,
                    input
                )) as IMMM;

                return {
                    message: `Mass message with ${massMessage.id} was changed successfully.`,
                    massMessage,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async deleteMassMessage(
            _: never,
            { massMessageId }: { massMessageId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                await mMMService.deleteMassMessage(token, massMessageId);

                return `Mass message with ${massMessageId} was deleted successfully.`;
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default mMMMutationResolver;
