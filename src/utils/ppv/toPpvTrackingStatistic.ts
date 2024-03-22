import { processPpvForVaults } from './processPpvForVaults';
import { VaultCustomData, OFMessage } from '../../typesStat';

export const toPpvTrackingStatistic = (
    custom: VaultCustomData[],
    ppvData: OFMessage[]
) => {
    return processPpvForVaults(custom, ppvData).map(
        ({ vault, ppvForVaults, revenue, purchases, purchaseRate }) => {
            let lastSale = new Date(0);

            ppvForVaults.forEach((ppv) => {
                if (ppv.isOpened) {
                    const itemDate = new Date(ppv.createdAt);
                    if (itemDate > lastSale) {
                        lastSale = itemDate;
                    }
                }
            });

            const lastSaleFormatted =
                lastSale.getTime() === 0 ? null : lastSale.toISOString();

            const qtyPictures = vault.photosCount;
            const qtyVideos = vault.videosCount;

            const totalMedia = qtyPictures + qtyVideos;
            const conversion = Math.round((purchases / totalMedia) * 100) || 0;

            return {
                name: vault.name,
                revenue: revenue,
                purchaseRate,
                purchases: purchases,
                lastSale: lastSaleFormatted,
                conversion,
                qtyPictures,
                qtyVideos: vault.mediaIds.length,
                id: vault.id.toString(),
            };
        }
    );
};
