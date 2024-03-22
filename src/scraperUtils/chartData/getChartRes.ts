import { Connection } from 'mongoose';
import { ICreator } from '../../types';
import { MergedChartData } from '../../typesStat/ChartDatesAmount';
import { getChartDatesAmountData, mergeManyChartData } from '../';

export const getChartRes = async (
    startDate: string,
    endDate: string,
    creators: ICreator[],
    statConnection: Connection
): Promise<MergedChartData> => {
    try {
        const chartRespPromises = creators.map((creator) => {
            if (!creator.creatorAuth) {
                throw new Error('CreatorAuth is undefined');
            }

            return getChartDatesAmountData(
                startDate,
                endDate,
                creator.creatorAuth,
                statConnection
            );
        });

        const chartRespDataSum = await Promise.all(chartRespPromises);

        return mergeManyChartData(chartRespDataSum);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
