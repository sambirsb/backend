import {
    PpvTrackingVaultResponse,
    PpvVaultMessage,
} from '../../generated/graphql';

export const getPpvFromTracking = async (
    ppvTracking: PpvTrackingVaultResponse,
    ppvId: string
): Promise<PpvVaultMessage> => {
    if (!ppvTracking.ppvMessages || ppvTracking.ppvMessages.length === 0) {
        console.error('ppvMessages is missing');
        throw new Error('ppvMessages is missing');
    }

    const ppv = ppvTracking.ppvMessages.find(
        (message) => message?.ppvId === ppvId
    );

    if (!ppv) {
        console.error('ppv is missing');
        throw new Error('ppv is missing');
    }

    return ppv;
};
