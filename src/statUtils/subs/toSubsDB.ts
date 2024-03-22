import { ISubscription, OFSubUser } from '../../typesStat';

export const toSubsDB = (
    user_id: string,
    data: OFSubUser
): Partial<ISubscription> => {
    return {
        _id: Number(data.id),
        user_id: Number(user_id),
        friend_user_id: data.id,
        userData: null,
        friendUserData: null,
        startDate: new Date(data.subscribedOnData.subscribeAt),
        price: data.subscribedOnData.totalSumm,
        OF_subUser: data as OFSubUser,
    } as Partial<ISubscription>;
};
