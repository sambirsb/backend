import { TimePeriod } from '../constants/TimePeriod';
import { DateAndAmount } from '../generated/graphql';

export interface TransEarningDailyWithIntervals {
    transEarningDaily: TransEarningDaily[];
    transEarningWithIntervals: DateAndAmount[];
}

export interface TransEarningDaily {
    period: TimePeriod;
    getTransEarning: TransEarningAndCount;
}

export interface TransEarningAndCount {
    amount: number;
    count: number;
}
