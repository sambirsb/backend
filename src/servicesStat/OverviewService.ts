import { Connection } from 'mongoose';
import creatorService from '../services/CreatorService';
import { getAdjustedDate, getDoubledPreviousStartDate } from '../utils';
import {
    getChartSubsTransData,
    getSubsTransDataRes,
    getTurnoverSumStatSectionPercents,
    getSubsWithExpiredStatSectionPercents,
    getTransStatSectionPercents,
    getTurnoverAndAvgEarnings,
    toSubsAndFansDaily,
    getTopFansOverview,
    getChartSubsChatsData,
    getSumRevenues,
    toOverallDetCompResponse,
    getNewSubsCount,
    getOpenChatsCount,
    aggregateFollowersChartData,
    formatChartData,
} from '../statUtils';
import { validateDatesFilterCreatorIdsInput } from '../validation/datesFilterManyCreatorValidation';
import { ICreator } from '../types';
import {
    DatesFilterManyCreatorIdsInput,
    GetOverallStatisticResponse,
    OverallDailyStats,
    OverallDetCompResponse,
} from '../generated/graphql';

class OverviewService {
    async getOverallStatistic(
        token: string,
        input: DatesFilterManyCreatorIdsInput,
        statConnection: Connection
    ): Promise<GetOverallStatisticResponse> {
        try {
            await validateDatesFilterCreatorIdsInput(input);
            const creators = (await creatorService.getCreatorsByIds(
                input.creatorIds,
                token
            )) as ICreator[];

            const doubledStartDate = getDoubledPreviousStartDate(
                input.startDate,
                input.endDate
            );

            const {
                chartRespData,
                subsLatestRespData,
                transactionsRespData,
                topCreators,
            } = await getChartSubsTransData(
                creators,
                doubledStartDate,
                input.endDate,
                statConnection
            );

            const { totalEarnings, incomeSources } =
                getTurnoverSumStatSectionPercents(
                    chartRespData,
                    input.startDate,
                    input.endDate
                );

            const followers = getSubsWithExpiredStatSectionPercents(
                subsLatestRespData,
                input.startDate,
                input.endDate
            );

            const totalEarningByQuantity = getTransStatSectionPercents(
                transactionsRespData,
                input.startDate,
                input.endDate
            );

            const topFans = getTopFansOverview(
                input.startDate,
                input.endDate,
                transactionsRespData
            );

            totalEarnings.chart = formatChartData(
                totalEarnings.chart,
                input.startDate,
                input.endDate
            );
            followers.chart = aggregateFollowersChartData(
                followers.chart,
                input.startDate,
                input.endDate
            );
            totalEarningByQuantity.chart = formatChartData(
                totalEarningByQuantity.chart,
                input.startDate,
                input.endDate
            );

            return {
                totalEarnings,
                followers,
                incomeSources,
                totalEarningByQuantity,
                topModels: topCreators,
                topFans,
            };
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async getOverallDailyStats(
        token: string,
        creatorIds: string[],
        statConnection: Connection
    ): Promise<OverallDailyStats> {
        try {
            const creators = (await creatorService.getCreatorsByIds(
                creatorIds,
                token
            )) as ICreator[];

            const startDate = getAdjustedDate(-72);
            const endDate = getAdjustedDate(0);

            const { subsLatestRespDataRes, transactionsRespDataRes } =
                await getSubsTransDataRes(
                    creators,
                    startDate,
                    endDate,
                    statConnection
                );

            const { fans, newSubs } = toSubsAndFansDaily(
                startDate,
                subsLatestRespDataRes
            );

            const { avgEarningFan, previous24hTurnover, revenue } =
                getTurnoverAndAvgEarnings(startDate, transactionsRespDataRes);

            return {
                previous24hTurnover,
                actual24hStats: {
                    revenue,
                    fans,
                    newSubs,
                    avgEarningFan,
                },
            };
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async getOverallDetComp(
        token: string,
        input: DatesFilterManyCreatorIdsInput,
        statConnection: Connection
    ): Promise<OverallDetCompResponse[] | null> {
        try {
            await validateDatesFilterCreatorIdsInput(input);
            const creators = (await creatorService.getCreatorsByIds(
                input.creatorIds,
                token
            )) as ICreator[];

            const { chartRespData, subsRespData, chatsRespData } =
                await getChartSubsChatsData(
                    creators,
                    input.startDate,
                    input.endDate,
                    statConnection
                );

            const sumRevenue = await getSumRevenues(chartRespData);
            const newSubs = await getNewSubsCount(subsRespData);
            const openChatsCount = await getOpenChatsCount(chatsRespData);

            return toOverallDetCompResponse(
                sumRevenue,
                newSubs,
                openChatsCount
            );
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }
}

const overviewService = new OverviewService();
export default overviewService;
