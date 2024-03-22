import Stripe from 'stripe';
import creatorService from './CreatorService';
import { checkCreatorOwner } from '../utils/creators/checkCreatorOwner';
import { sendPaymentCheckoutEmail } from '../utils/sendGridUtils';
import { elevateError } from '../errors/elevateError';
import { ICreator } from '../types';
import { PaymentCheckoutInput } from '../generated/graphql';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

class SubscriptionService {
    async paymentCheckout(token: string, input: PaymentCheckoutInput) {
        try {
            const { creatorId, priceId } = input;

            await checkCreatorOwner(token, creatorId);

            const checkoutSession = await stripe.checkout.sessions.create({
                mode: 'subscription',
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                client_reference_id: creatorId,
                success_url: `${process.env.FRONT_URL}?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONT_URL}/canceled`,
            });
            const { id: checkoutSessionId, url: redirectUrl } = checkoutSession;

            await sendPaymentCheckoutEmail(creatorId);

            return { redirectUrl, checkoutSessionId };
        } catch (err) {
            elevateError(err);
        }
    }

    async getBillingPortal(token: string, creatorId: string) {
        await checkCreatorOwner(token, creatorId);

        const creator = (await creatorService.getCreatorById(
            creatorId
        )) as ICreator;

        if (!creator.license?.customerId)
            throw new Error('Client did not buy a subscription yet');

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: creator.license?.customerId || '',
            return_url: process.env.FRONT_URL,
        });

        return portalSession.url;
    }
}

const subscriptionService = new SubscriptionService();
export default subscriptionService;
