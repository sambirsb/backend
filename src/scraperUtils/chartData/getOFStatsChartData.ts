import { ChartType } from '../../constants/ChartType';
import { generateDateRangeAmountStats } from '../forScraping/generateDateRangeAmountStats';
import { formatDate } from '../../utils';
import { MergedChartData } from '../../typesStat';
import { ChartsByType, TotalChart } from '../../generated/graphql';

interface GetOFStatsChartData {
    totalCharts: TotalChart;
    charts: ChartsByType[];
}

export const getOFStatsChartData = (
    startDate: string,
    endDate: string,
    chartRespData: MergedChartData
): GetOFStatsChartData => {
    const totalCharts: TotalChart = {
        total: 0,
        subscription: 0,
        tips: 0,
        posts: 0,
        referrals: 0,
        messages: 0,
        streams: 0,
    };
    const resultCharts: ChartsByType[] = generateDateRangeAmountStats(
        startDate,
        endDate,
        ChartType.SUBSCRIBES
    ).map((dateObj) => ({
        date: dateObj.date,
        subscription: 0,
        tips: 0,
        posts: 0,
        referrals: 0,
        messages: 0,
        streams: 0,
    }));

    chartRespData.chartAmountTotalAll.forEach((item) => {
        const formattedDate = formatDate(item.date);
        const chartEntry = resultCharts.find(
            (chart) => chart.date === formattedDate
        );

        if (chartEntry) {
            chartEntry.subscription = Math.round(item.subscribes);
            chartEntry.tips = Math.round(item.tips);
            chartEntry.posts = Math.round(item.post);
            chartEntry.referrals = Math.round(item.ref);
            chartEntry.messages = Math.round(item.chat_messages);
            chartEntry.streams = Math.round(item.stream);
        }
    });

    chartRespData.sum.forEach((sumItem) => {
        let key: keyof TotalChart;

        switch (sumItem.name) {
            case ChartType.SUBSCRIBES:
                key = 'subscription';
                break;
            case ChartType.TIPS:
                key = 'tips';
                break;
            case ChartType.POST:
                key = 'posts';
                break;
            case ChartType.REF:
                key = 'referrals';
                break;
            case ChartType.MESSAGES:
                key = 'messages';
                break;
            case ChartType.STREAM:
                key = 'streams';
                break;
            default:
                key = sumItem.name as keyof TotalChart;
        }

        if (key && key !== 'total') {
            const roundedValue = parseFloat(sumItem.count.toFixed(2));
            totalCharts[key] = roundedValue;
            totalCharts.total += roundedValue;
        }
    });

    return {
        totalCharts,
        charts: resultCharts,
    };
};
