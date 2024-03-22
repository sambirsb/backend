import authService from '../../services/AuthService';
import welcomeMessageService from '../../services/WelcomeMessageService';
import { IWelcomeMessage } from '../../types';
import {
    ChangeWelcomeMessageInput,
    CreateWelcomeMessageInput,
} from '../../generated/graphql';

const welcomeMessageMutationResolver = {
    Mutation: {
        async createWelcomeMessage(
            _: never,
            { input }: { input: CreateWelcomeMessageInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const welcomeMessage =
                    (await welcomeMessageService.createWelcomeMessage(
                        token,
                        input
                    )) as IWelcomeMessage;

                return {
                    message: `Welcome message with id: ${welcomeMessage.id} was created`,
                    welcomeMessage,
                };
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        },

        async changeWelcomeMessage(
            _: never,
            { input }: { input: ChangeWelcomeMessageInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                const welcomeMessage =
                    (await welcomeMessageService.changeWelcomeMessage(
                        token,
                        input
                    )) as IWelcomeMessage;

                return {
                    message: `Welcome message with id: ${welcomeMessage.id} was updated`,
                    welcomeMessage,
                };
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        },

        async deleteWelcomeMessage(
            _: never,
            { welcomeMessageId }: { welcomeMessageId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                await welcomeMessageService.deleteWelcomeMessage(
                    token,
                    welcomeMessageId
                );

                return `Welcome message with id: ${welcomeMessageId} was deleted`;
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        },
    },
};
export default welcomeMessageMutationResolver;
