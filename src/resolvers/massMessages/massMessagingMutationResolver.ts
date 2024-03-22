import authService from '../../services/AuthService';
import massMessagingService from '../../services/MassMessagingService';
import { elevateError } from '../../errors/elevateError';
import {
    ChangeMassMessagingInput,
    CreateMassMessagingInput,
    MassMessagingWithMessagesResponse,
} from '../../generated/graphql';

const massMessagingMutationResolver = {
    Mutation: {
        async createMassMessaging(
            _: never,
            { input }: { input: CreateMassMessagingInput },
            context: any
        ): Promise<MassMessagingWithMessagesResponse> {
            try {
                const token = authService.checkToken(context.token);

                const massMessagingResponse =
                    (await massMessagingService.createMassMessaging(
                        token,
                        input
                    )) as any;

                const massMessaging = {
                    ...massMessagingResponse,
                    id: massMessagingResponse._id,
                };

                return {
                    message: 'Mass messaging successfully created',
                    massMessaging,
                };
            } catch (err) {
                console.error('Error:', err);
                throw err;
            }
        },

        async changeMassMessaging(
            _: never,
            { input }: { input: ChangeMassMessagingInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const massMessaging =
                    await massMessagingService.changeMassMessaging(
                        token,
                        input
                    );

                return {
                    message: `Mass messaging with id: ${input.id} successfully changed`,
                    massMessaging,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async duplicateMassMessaging(
            _: never,
            { massMessagingId }: { massMessagingId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const massMessaging =
                    await massMessagingService.duplicateMassMessaging(
                        token,
                        massMessagingId
                    );

                return {
                    message: `Mass messaging with id: ${massMessagingId} successfully duplicated`,
                    massMessaging,
                };
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default massMessagingMutationResolver;
