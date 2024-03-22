import { toGetPpvTrackingR } from '../../scraperUtils';
import { VaultCustomData, OFMessage } from '../../typesStat';

export const calculatePpvRevenue = (
    vaultCustomData: VaultCustomData[],
    messagesByDate: OFMessage[]
) => {
    const revenue = [];
    for (const vault of vaultCustomData) {
        const vaultRevenue = toGetPpvTrackingR(vault, messagesByDate);
        revenue.push(vaultRevenue);
    }
    return revenue;
};
