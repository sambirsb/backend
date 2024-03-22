import { OFChartAmount } from './OFLibTypes';

export interface OFChartDatesAmountResponse {
    total: SummaryStats;
    subscribes: SummaryStats;
    tips: SummaryStats;
    post: SummaryStats;
    chat_messages: SummaryStats;
    ref: SummaryStats;
    stream: SummaryStats;
}

export interface SummaryStats {
    delta: number;
    chartAmount: OFChartAmount[];
    total: number;
    gross: number;
}
