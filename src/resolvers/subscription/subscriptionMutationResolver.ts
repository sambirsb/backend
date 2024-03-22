import authService from '../../services/AuthService';
import subscriptionService from '../../services/SubscriptionService';
import { elevateError } from '../../errors/elevateError';
import { PaymentCheckoutInput } from '../../generated/graphql';

const subscriptionMutationResolver = {
    Mutation: {
        async paymentCheckout(
            _: never,
            { input }: { input: PaymentCheckoutInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await subscriptionService.paymentCheckout(token, input);
            } catch (err) {
                elevateError(err);
            }
        },

        async getBillingPortal(
            _: never,
            { creatorId }: { creatorId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await subscriptionService.getBillingPortal(
                    token,
                    creatorId
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default subscriptionMutationResolver;
