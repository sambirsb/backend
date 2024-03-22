import authService from '../../services/AuthService';
import welcomeMessageService from '../../services/WelcomeMessageService';

const welcomeMessageQueryResolver = {
    Query: {
        async getOneWelcomeMessage(
            _: never,
            { welcomeMessageId }: { welcomeMessageId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await welcomeMessageService.getOneWelcomeMessage(
                    token,
                    welcomeMessageId
                );
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get welcome message.');
            }
        },

        async getAllWelcomeMessage(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await welcomeMessageService.getAllWelcomeMessage(
                    token,
                    creatorId
                );
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get welcome messages.');
            }
        },
    },
};

export default welcomeMessageQueryResolver;
