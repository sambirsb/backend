import { TimePeriod } from '../constants/TimePeriod';
import { ISubscription } from './ISubscription';

export interface GetSubsResponse {
    user_id: string;
    preUpdateDate: string;
    transactions: ISubscription[];
}

export interface ActualSubsData {
    friend_user_id: number;
    startDate: Date;
    price: number;
}

export interface ExpiredSubsData {
    friend_user_id: number;
    expiredAt: Date;
    price: number;
}

export interface SubsWithExpired {
    actual: ActualSubsData[];
    expired: ExpiredSubsData[];
}

export interface SubsLatestCountsDaily {
    period: TimePeriod;
    getSubsLatestCounts: GetSubsCounts;
}

export interface GetSubsCounts {
    newSubsWithPrice: number;
    allNewSubs: number;
}
