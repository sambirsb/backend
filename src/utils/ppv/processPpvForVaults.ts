import { VaultCustomData, OFMessage } from '../../typesStat';

export const processPpvForVaults = (
    custom: VaultCustomData[],
    ppvData: OFMessage[]
) => {
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

        const purchaseRate =
            Math.round((100 / (purchases + noPurchases)) * purchases) || 0;

        return {
            vault,
            ppvForVaults,
            revenue,
            purchases,
            noPurchases,
            purchaseRate,
        };
    });
};
