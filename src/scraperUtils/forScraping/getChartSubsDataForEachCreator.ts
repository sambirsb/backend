import { Connection } from 'mongoose';
import { getChartDataDB, getSubsWithExpiredOLD } from '../../statUtils';
import {
    ChartCreatorData,
    GetChartSubsDataForEachCreator,
    ICreator,
    SubsLatestData,
} from '../../types';

export const getChartSubsDataForEachCreator = async (
    creators: ICreator[],
    startDate: string,
    endDate: string,
    statConnection: Connection
): Promise<GetChartSubsDataForEachCreator> => {
    try {
        const chartDataArr: ChartCreatorData[] = [];
        const subsLatestDataArr: SubsLatestData[] = [];

        for (const creator of creators) {
            if (!creator.creatorAuth) {
                throw new Error('CreatorAuth is undefined');
            }

            const chartRespPromise = getChartDataDB(
                startDate,
                endDate,
                creator.creatorAuth,
                statConnection
            );

            const subsLatestRespPromise = getSubsWithExpiredOLD(
                startDate,
                endDate,
                creator.creatorAuth,
                statConnection
            );

            const [chartRespData, subsLatestRespData] = await Promise.all([
                chartRespPromise,
                subsLatestRespPromise,
            ]);

            chartDataArr.push(<ChartCreatorData>{
                creatorId: creator.id,
                creatorName: creator.userName,
                chartData: chartRespData,
            });

            subsLatestDataArr.push(<SubsLatestData>{
                creatorId: creator.id,
                subsLatestData: subsLatestRespData,
            });
        }

        return {
            chartDataArr,
            subsLatestDataArr,
        };
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
