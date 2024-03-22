import { processPpvForVaults } from '../../utils/ppv/processPpvForVaults';
import { OFMessage } from '../../typesStat/fromOF/OFMessagesResponseData';
import { VaultCustomData } from '../../typesStat/VaultTypes';

export const toPpvTrackingR = (
    custom: VaultCustomData[],
    ppvData: OFMessage[]
) => {
    return processPpvForVaults(custom, ppvData).map(
        ({ vault, revenue, purchaseRate, purchases }) => ({
            name: vault.name,
            revenue: revenue,
            purchaseRate,
            purchases: purchases,
            id: vault.id.toString(),
        })
    );
};
