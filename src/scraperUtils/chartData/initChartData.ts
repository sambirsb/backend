import { ChartAmountTotalAll } from '../../typesStat/ChartDatesAmount';

export const initChartData = (date: string): ChartAmountTotalAll => {
    return {
        date,
        total: 0,
        subscribes: 0,
        tips: 0,
        post: 0,
        chat_messages: 0,
        ref: 0,
        stream: 0,
    };
};
