import { ChartCreatorData } from '../../types';

export interface ChartTypesForCreator {
    creatorId: string;
    creatorName: string;
    subscription: number;
    tips: number;
    messages: number;
    referrals: number;
    totalEarning: number;
}

export const getChartTypesForEachCreator = (
    chartDataArr: ChartCreatorData[]
): ChartTypesForCreator[] => {
    return chartDataArr.map((chartData) => {
        let subscription = 0;
        let tips = 0;
        let messages = 0;
        let referrals = 0;
        let totalEarning = 0;

        chartData.chartData.sum.forEach((sum) => {
            switch (sum.name) {
                case 'subscribes':
                    subscription += sum.count;
                    break;
                case 'tips':
                    tips += sum.count;
                    break;
                case 'chat_messages':
                    messages += sum.count;
                    break;
                case 'ref':
                    referrals += sum.count;
                    break;
                case 'total':
                    totalEarning += sum.count;
                    break;
            }
        });

        return {
            creatorId: chartData.creatorId,
            creatorName: chartData.creatorName,
            subscription: Math.round(subscription),
            tips: Math.round(tips),
            messages: Math.round(messages),
            referrals: Math.round(referrals),
            totalEarning: Math.round(totalEarning),
        };
    });
};
