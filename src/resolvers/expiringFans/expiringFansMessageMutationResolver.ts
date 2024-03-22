import authService from '../../services/AuthService';
import expiringFansMessageService from '../../services/ExpiringFansMessageService';
import { elevateError } from '../../errors/elevateError';
import {
    ChangeExpiringFansMessageInput,
    CreateExpiringFansMessageInput,
} from '../../generated/graphql';
import { IExpiringFansMessage } from '../../types';

const expiringFansMessageMutationResolver = {
    Mutation: {
        async createExpiringFansMessage(
            _: never,
            { input }: { input: CreateExpiringFansMessageInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const expiringFans =
                    (await expiringFansMessageService.createExpiringFansMessage(
                        token,
                        input
                    )) as IExpiringFansMessage;

                return {
                    message: `Expiring fans with id: ${expiringFans.id} was created`,
                    expiringFans,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async changeExpiringFansMessage(
            _: never,
            { input }: { input: ChangeExpiringFansMessageInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const expiringFans =
                    (await expiringFansMessageService.changeExpiringFansMessage(
                        token,
                        input
                    )) as IExpiringFansMessage;

                return {
                    message: `Expiring fans with id: ${expiringFans.id} was updated`,
                    expiringFans,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async deleteExpiringFansMessage(
            _: never,
            { expiringFansMessageId }: { expiringFansMessageId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                await expiringFansMessageService.deleteExpiringFansMessage(
                    token,
                    expiringFansMessageId
                );

                return `Expiring fans with id: ${expiringFansMessageId} was deleted`;
            } catch (err) {
                elevateError(err);
            }
        },
    },
};
export default expiringFansMessageMutationResolver;
