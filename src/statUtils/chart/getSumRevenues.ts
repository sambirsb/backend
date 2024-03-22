import {
    ChartDataWithCreatorIdAndName,
    SumRevenues,
    SumRevenuesWithCreatorIdAndName,
} from '../../typesStat';

export const getSumRevenues = async (
    data: ChartDataWithCreatorIdAndName[]
): Promise<SumRevenuesWithCreatorIdAndName[]> => {
    try {
        return data.map((creatorData) => {
            const { chartRespData, creatorId, creatorName } = creatorData;
            const sumRevenues: SumRevenues =
                chartRespData.chartAmountTotalAll.reduce(
                    (acc, curr) => {
                        return {
                            totalRevenue: parseFloat(
                                (acc.totalRevenue + curr.total).toFixed(2)
                            ),
                            subscribes: parseFloat(
                                (acc.subscribes + curr.subscribes).toFixed(2)
                            ),
                            tips: parseFloat((acc.tips + curr.tips).toFixed(2)),
                            post: parseFloat((acc.post + curr.post).toFixed(2)),
                            chat_messages: parseFloat(
                                (
                                    acc.chat_messages + curr.chat_messages
                                ).toFixed(2)
                            ),
                            ref: parseFloat((acc.ref + curr.ref).toFixed(2)),
                            stream: parseFloat(
                                (acc.stream + curr.stream).toFixed(2)
                            ),
                        };
                    },
                    {
                        totalRevenue: 0,
                        subscribes: 0,
                        tips: 0,
                        post: 0,
                        chat_messages: 0,
                        ref: 0,
                        stream: 0,
                    }
                );

            return {
                creatorId,
                creatorName,
                sumRevenues,
            };
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};
