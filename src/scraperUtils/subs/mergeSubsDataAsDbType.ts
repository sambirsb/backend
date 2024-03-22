import { OFSubscriptionLatestResponseData } from '../../typesStat/fromOF/OFSubscriptionLatestResponseData';
import { GetSubsResponse, ActualSubsData } from '../../typesStat/SubsTypes';

export const mergeSubsDataAsDbType = (
    subs: GetSubsResponse,
    subscriptionLatestData: OFSubscriptionLatestResponseData
): ActualSubsData[] => {
    const mergedData: ActualSubsData[] = [];

    subscriptionLatestData.users.forEach((user) => {
        const dbSub = subs.transactions.find((sub) => sub.user_id === user.id);
        if (dbSub) {
            const subscription: ActualSubsData = {
                friend_user_id: dbSub.friend_user_id,
                startDate: new Date(dbSub.startDate),
                price: user.subscribePrice,
            };
            mergedData.push(subscription);
        }
    });

    subscriptionLatestData.users.forEach((user) => {
        const isAlreadyIncluded = mergedData.some(
            (sub) => sub.friend_user_id === user.id
        );

        if (!isAlreadyIncluded) {
            const startDateArray = user.subscribedOnData.subscribes
                .filter((s) => s.action === 'subscribe' && s.startDate)
                .map((s) => s.startDate);

            const startDate =
                startDateArray.length > 0
                    ? startDateArray[0]
                    : new Date().toISOString();

            const subscription: ActualSubsData = {
                friend_user_id: user.id,
                startDate: new Date(startDate?.toString()),
                price: user.subscribePrice,
            };
            mergedData.push(subscription);
        }
    });

    return mergedData;
};
