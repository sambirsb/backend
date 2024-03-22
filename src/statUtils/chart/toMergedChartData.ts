import {
    ChartAmountAll,
    ChartAmountTotalAll,
    MergedChartData,
    TotalChartType,
} from '../../typesStat/ChartDatesAmount';

export const toMergedChartData = (data: ChartAmountAll[]): MergedChartData => {
    const chartAmountTotalAll: ChartAmountTotalAll[] = [];
    const categorySums: { [key: string]: number } = {
        subscribes: 0,
        tips: 0,
        post: 0,
        chat_messages: 0,
        ref: 0,
        stream: 0,
    };

    data.forEach((item) => {
        const { date, subscribes, tips, post, chat_messages, ref, stream } =
            item;
        const total = subscribes + tips + post + chat_messages + ref + stream;
        chartAmountTotalAll.push({
            date,
            subscribes,
            tips,
            post,
            chat_messages,
            ref,
            stream,
            total,
        });

        categorySums.subscribes += subscribes;
        categorySums.tips += tips;
        categorySums.post += post;
        categorySums.chat_messages += chat_messages;
        categorySums.ref += ref;
        categorySums.stream += stream;
    });

    const sum: TotalChartType[] = Object.keys(categorySums).map((key) => ({
        name: key,
        count: categorySums[key],
    }));

    return {
        chartAmountTotalAll,
        sum,
    };
};
