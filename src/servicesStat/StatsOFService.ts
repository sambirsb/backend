import { Connection } from 'mongoose';
import creatorService from '../services/CreatorService';
import {
    getChartRes,
    getChartSubsDataForEachCreator,
    getChartTypesForEachCreator,
    getOFStatsChartData,
    getSubsLatestDataForEachCreator,
    toOFDetailedStats,
} from '../scraperUtils';
import { formatChartDataForOFStats } from '../statUtils/chart/formatChartDataOFstats';
import { validateDatesFilterCreatorIdsInput } from '../validation/datesFilterManyCreatorValidation';
import { elevateError } from '../errors/elevateError';
import { ICreator } from '../types';
import { DatesFilterManyCreatorIdsInput } from '../generated/graphql';

class StatsOFService {
    async getOFStats(
        token: string,
        input: DatesFilterManyCreatorIdsInput,
        statConnection: Connection
    ) {
        try {
            await validateDatesFilterCreatorIdsInput(input);
            const creators = (await creatorService.getCreatorsByIds(
                input.creatorIds,
                token
            )) as ICreator[];

            const chartRespDataRes = await getChartRes(
                input.startDate,
                input.endDate,
                creators,
                statConnection
            );

            const { totalCharts, charts } = getOFStatsChartData(
                input.startDate,
                input.endDate,
                chartRespDataRes
            );

            return {
                numberOfCreators: creators.length,
                refunded: 0,
                totalCharts,
                charts: formatChartDataForOFStats(
                    charts,
                    input.startDate,
                    input.endDate
                ),
            };
        } catch (err) {
            elevateError(err);
        }
    }

    async getOFDetailedStats(
        token: string,
        input: DatesFilterManyCreatorIdsInput,
        statConnection: Connection
    ) {
        try {
            await validateDatesFilterCreatorIdsInput(input);
            const creators = (await creatorService.getCreatorsByIds(
                input.creatorIds,
                token
            )) as ICreator[];

            const { chartDataArr, subsLatestDataArr } =
                await getChartSubsDataForEachCreator(
                    creators,
                    input.startDate,
                    input.endDate,
                    statConnection
                );

            const chartTypesForEachCreator =
                getChartTypesForEachCreator(chartDataArr);

            const subsLatestDataForEachCreator =
                getSubsLatestDataForEachCreator(
                    input.startDate,
                    subsLatestDataArr
                );

            return toOFDetailedStats(
                chartTypesForEachCreator,
                subsLatestDataForEachCreator
            );
        } catch (err) {
            elevateError(err);
        }
    }
}
export const statsOFScraperService = new StatsOFService();
export default statsOFScraperService;
