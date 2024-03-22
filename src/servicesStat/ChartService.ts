import mongoose from 'mongoose';
import ChartDatesAmountModel from '../modelsStat/ChartDatesAmountModel';
import { formatDate } from '../utils/dates/formatDate';
import {
    ChartAmountAll,
    ChartDatesAmount,
    FindChartDatesAmountsResponse,
} from '../typesStat/ChartDatesAmount';
import { OFChartDatesAmountResponse } from '../typesStat/fromOF/OFChartDatesAmountResponse';

class ChartDateAmountService {
    async findChartDatesAmounts(
        startDate: string,
        endDate: string,
        user_id: string,
        statConnection: mongoose.Connection
    ): Promise<FindChartDatesAmountsResponse> {
        try {
            const ChartDatesAmountModelObj =
                ChartDatesAmountModel(statConnection);

            const chartDatesAmountsAggregation =
                (await ChartDatesAmountModelObj.aggregate([
                    { $match: { user_id: user_id } },
                    { $unwind: '$chartAmountAll' },
                    {
                        $match: {
                            'chartAmountAll.date': {
                                $gte: formatDate(startDate),
                                $lte: formatDate(endDate),
                            },
                        },
                    },
                    {
                        $group: {
                            _id: '$user_id',
                            chartAmountAll: { $push: '$chartAmountAll' },
                        },
                    },
                ])) as any[];

            if (
                chartDatesAmountsAggregation.length === 0 ||
                chartDatesAmountsAggregation[0].chartAmountAll.length === 0
            ) {
                return {
                    user_id,
                    preUpdateDate: startDate,
                    chartDatesAmounts: [],
                };
            }

            const chartAmountAllFiltered =
                chartDatesAmountsAggregation[0].chartAmountAll;
            const preUpdateDate =
                chartAmountAllFiltered[
                    chartAmountAllFiltered.length - 1
                ].date.toString();

            return {
                user_id,
                preUpdateDate: preUpdateDate ? preUpdateDate : startDate,
                chartDatesAmounts: chartAmountAllFiltered || [],
            };
        } catch (err: any) {
            console.error('Error:', err.data);
            throw err;
        }
    }

    async updateCharts(
        data: OFChartDatesAmountResponse,
        user_id: string,
        statConnection: mongoose.Connection
    ) {
        try {
            const ChartDatesAmountModelObj =
                ChartDatesAmountModel(statConnection);

            const chartAmountData = [];

            for (let i = 0; i < data.subscribes.chartAmount.length; i++) {
                chartAmountData.push({
                    date: data.subscribes.chartAmount[i].date,
                    subscribes: data.subscribes.chartAmount[i].count,
                    tips: data.tips.chartAmount[i].count,
                    post: data.post.chartAmount[i].count,
                    chat_messages: data.chat_messages.chartAmount[i].count,
                    ref: data.ref.chartAmount[i].count,
                    stream: data.stream.chartAmount[i].count,
                });
            }

            const chartAmount = (await ChartDatesAmountModelObj.findOne({
                user_id,
            })) as ChartDatesAmount;

            if (!chartAmount) {
                const chartDatesAmountInstance = new ChartDatesAmountModelObj({
                    user_id,
                    chartAmountAll: chartAmountData as ChartAmountAll[],
                });

                await chartDatesAmountInstance.save();
                return;
            }

            for (const chartData of chartAmountData) {
                const index = chartAmount.chartAmountAll.findIndex(
                    (item) => item.date === chartData.date
                );

                if (index !== -1) {
                    chartAmount.chartAmountAll[index] = chartData;
                } else {
                    chartAmount.chartAmountAll.push(chartData);
                }
            }
            await chartAmount.save();
        } catch (err: any) {
            console.error('Error:', err.data);
            throw err;
        }
    }
}

const chartService = new ChartDateAmountService();
export default chartService;
