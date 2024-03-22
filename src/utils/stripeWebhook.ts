import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as any);
import CreatorModel from '../models/CreatorModel';
import { ICreator } from '../types';

export const stripeWebhook = async (req: any, res: any) => {
    let event;

    try {
        event = await stripe.webhooks.constructEvent(
            req.body,
            req.headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET as string
        );

        if (
            [
                'checkout.session.completed',
                'invoice.paid',
                'invoice.payment_succeeded',
                'invoice.payment_failed',
            ].includes(event.type)
        ) {
            const dataObject = event.data.object as any;
            const { customer, created, subscription } = dataObject;
            const subscriptionReceive =
                await stripe.subscriptions.retrieve(subscription);
            const createdDate = new Date(created * 1000);
            const expires_atDate = new Date(
                subscriptionReceive.current_period_end * 1000
            );
            const creator = (await CreatorModel.findById(
                String(dataObject.client_reference_id)
            )) as ICreator;

            const info = {
                subscriptionId: subscription,
                customerId: customer,
                startDate: createdDate,
                endDate: expires_atDate,
                status: true,
            };

            switch (event.type) {
                case 'checkout.session.completed':
                    creator.license = info;
                    await creator.save();

                    break;
                case 'invoice.paid':
                    creator.license = info;
                    await creator.save();

                    break;
                case 'invoice.payment_succeeded':
                    creator.license = info;
                    await creator.save();

                    break;
                case 'invoice.payment_failed':
                    info.status = false;

                    creator.license = info;
                    await creator.save();

                    break;
                default:
            }

            res.sendStatus(200);
        }
    } catch (err: any) {
        console.log(`❌ Error message: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
};
