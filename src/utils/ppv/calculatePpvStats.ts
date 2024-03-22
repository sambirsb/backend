import { toPpvTrackingStatistic } from '../';
import { VaultCustomData, OFMessage } from '../../typesStat';

export const calculatePpvStats = (
    vaultCustomData: VaultCustomData[],
    messagesByDate: OFMessage[]
) => {
    const statistic = [];
    for (const vault of vaultCustomData) {
        statistic.push(...toPpvTrackingStatistic([vault], messagesByDate));
    }
    return statistic;
};
