import { Connection } from 'mongoose';
import chartService from '../../servicesStat/ChartService';
import { getUserIdFromCreatorAuth } from '../../utils';
import { toMergedChartData } from '../';
import { MergedChartData } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getChartDataDB = async (
    startDate: string,
    endDate: string,
    creatorAuth: CreatorAuth,
    statConnection: Connection
): Promise<MergedChartData> => {
    try {
        const user_id = await getUserIdFromCreatorAuth(creatorAuth);

        const data = await chartService.findChartDatesAmounts(
            startDate,
            endDate,
            user_id,
            statConnection
        );

        return toMergedChartData(data.chartDatesAmounts);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
