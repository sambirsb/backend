import { OFMessage } from '../../typesStat/fromOF/OFMessagesResponseData';
import { VaultCustomData } from '../../typesStat/VaultTypes';
import { PpvTrackingResponse } from '../../generated/graphql';

export const processVaults = (
    custom: VaultCustomData[],
    ppvData: OFMessage[]
): PpvTrackingResponse[] => {
    return custom.map((vault) => {
        const ppvForVaults = ppvData
            .filter((ppv) =>
                ppv.media.some((mediaItem) =>
                    vault.mediaIds.includes(mediaItem.id)
                )
            )
            .map((ppv) => ({
                ...ppv,
                isOpened: ppv.isOpened,
                price: ppv.price,
            }));

        const revenue = ppvForVaults.reduce(
            (sum, item) => (item.isOpened ? sum + item.price : sum),
            0
        );

        const purchases = ppvForVaults.filter((item) => item.isOpened).length;
        const noPurchases = ppvForVaults.filter(
            (item) => !item.isOpened
        ).length;

        const purchaseRate = (100 / (purchases + noPurchases)) * purchases || 0;

        return {
            name: vault.name,
            revenue: revenue,
            purchaseRate,
            purchases: purchases,
            id: vault.id.toString(),
        };
    });
};
