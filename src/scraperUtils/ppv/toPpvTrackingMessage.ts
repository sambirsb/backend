import {
    PpvTrackingVaultMessagesResponse,
    PpvVaultMessage,
} from '../../generated/graphql';

export const toPpvTrackingMessage = (
    ppvVaultMessage: PpvVaultMessage
): PpvTrackingVaultMessagesResponse => {
    if (!ppvVaultMessage) {
        throw new Error('ppvVaultMessage is missing');
    }

    let isPurchased = false;

    if (ppvVaultMessage.bought) {
        isPurchased = ppvVaultMessage.bought > 0;
    }

    return {
        sent: ppvVaultMessage.sent,
        bought: ppvVaultMessage.bought,
        avgNetPrice: ppvVaultMessage.avgNetPrice,
        netRevenue: ppvVaultMessage.netRevenue,
        purchaseRate: ppvVaultMessage.purchaseRate,
        message: {
            text: ppvVaultMessage.text,
            sentAt: ppvVaultMessage.createdAt,
            purchased: isPurchased,
            sender: '', //need to rewrite
            price: ppvVaultMessage.netRevenue, //need to rewrite
            messageId: ppvVaultMessage.ppvId, //need to rewrite
        },
    };
};
