import { OFSubscriptionLatestResponseData } from '../../typesStat/fromOF/OFSubscriptionLatestResponseData';
import { SubsTopData } from '../../types';

export const mergeManySubsTopData = (
    allSubsTopData: OFSubscriptionLatestResponseData[]
): SubsTopData[] => {
    const userMap = new Map<
        string,
        {
            id: string;
            name: string;
            userName: string;
            avatarUrl: string;
            total: number;
        }
    >();

    allSubsTopData.forEach((subsData) => {
        subsData.users.forEach((user) => {
            const existingUser = userMap.get(user.username);

            if (existingUser) {
                existingUser.total += user.subscribedOnData.totalSumm;
            } else {
                userMap.set(user.username, {
                    id: user.id.toString(),
                    name: user.name,
                    userName: user.username,
                    avatarUrl: user.avatar || '',
                    total: user.subscribedOnData.totalSumm,
                });
            }
        });
    });

    return Array.from(userMap.values());
};
