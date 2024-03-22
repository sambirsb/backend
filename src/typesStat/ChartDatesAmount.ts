import { Document } from 'mongoose';
import { StatisticSection } from '../generated/graphql';
import { OFChartAmount } from './fromOF/OFLibTypes';

export interface ChartData {
    delta: number;
    chartAmount: OFChartAmount[];
    total: number;
    gross: number;
}
export interface ChartResponse {
    total: ChartData;
    subscribes: ChartData;
    tips: ChartData;
    post: ChartData;
    chat_messages: ChartData;
    ref: ChartData;
    stream: ChartData;
}

export interface FindChartDatesAmountsResponse {
    user_id: string;
    preUpdateDate: string;
    chartDatesAmounts: ChartAmountAll[];
}

export interface ChartDatesAmount extends Document {
    user_id: string;
    chartAmountAll: ChartAmountAll[];
}

export interface ChartAmountAll {
    date: string;
    subscribes: number;
    tips: number;
    post: number;
    chat_messages: number;
    ref: number;
    stream: number;
}

export interface TotalChartType {
    name: string;
    count: number;
}

export interface ChartAmountTotalAll {
    total: number;
    date: string;
    subscribes: number;
    tips: number;
    post: number;
    chat_messages: number;
    ref: number;
    stream: number;
}

export interface MergedChartData {
    chartAmountTotalAll: ChartAmountTotalAll[];
    sum: TotalChartType[];
}

export interface GetChartWithTotal {
    turnover: StatisticSection;
    subscription: StatisticSection;
}
