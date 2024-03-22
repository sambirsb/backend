import {
    ActualSubsData,
    ExpiredSubsData,
    ISubscription,
    SubsWithExpired,
} from '../../typesStat';

export const getActualAndExpiredFromSubs = (
    subsDataDB: ISubscription[],
    endDate: string
): SubsWithExpired => {
    const actual: ActualSubsData[] = [];
    const expired: ExpiredSubsData[] = [];

    subsDataDB.forEach((sub) => {
        if (
            sub.OF_subUser.subscribedOn &&
            !sub.OF_subUser.subscribedOnExpiredNow
        ) {
            const subDataActual = {
                friend_user_id: sub.id,
                startDate: new Date(
                    sub.OF_subUser.subscribedOnData.subscribeAt
                ),
                price: sub.OF_subUser.subscribedOnData.price,
            };

            actual.push(subDataActual);

            const subDataExpired = {
                friend_user_id: sub.id,
                expiredAt: new Date(sub.OF_subUser.subscribedOnData.expiredAt),
                price: sub.OF_subUser.subscribedOnData.price,
            };

            if (subDataExpired.expiredAt < new Date(endDate)) {
                expired.push(subDataExpired);
            }
        }
    });

    return { actual, expired };
};
