import { toPpvTrackingR } from './toPpvTrackingR';
import { VaultCustomData } from '../../typesStat/VaultTypes';
import { OFMessage } from '../../typesStat/fromOF/OFMessagesResponseData';
import {
    PpvTrackingResponse,
    PpvTrackingVaultResponse,
} from '../../generated/graphql';

export const toGetPpvTrackingR = (
    customVault: VaultCustomData,
    ppvData: OFMessage[]
): PpvTrackingVaultResponse => {
    const ppvTrackingResponse: PpvTrackingResponse[] = toPpvTrackingR(
        [customVault],
        ppvData
    );

    const ppvMessages = ppvData
        .filter((ppv) =>
            ppv.media.some((mediaItem) =>
                customVault.mediaIds.includes(mediaItem.id)
            )
        )
        .map((ppv) => {
            if (!ppv.id) {
                throw new Error('ppv.id is missing');
            }

            return {
                ppvId: ppv.id.toString(),
                createdAt: ppv.createdAt,
                text: ppv.text,
                sent: 1,
                bought: ppv.isOpened ? 1 : 0,
                purchaseRate: ppv.isOpened ? 100 : 0,
                netRevenue: ppv.isOpened ? ppv.price : 0,
                avgNetPrice: ppv.isOpened ? ppv.price : 0,
            };
        });

    return {
        name: customVault.name,
        revenue: ppvTrackingResponse[0].revenue,
        purchaseRate: ppvTrackingResponse[0].purchaseRate,
        purchases: ppvTrackingResponse[0].purchases,
        ppvMessages,
    };
};
