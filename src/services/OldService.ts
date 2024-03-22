import mongoose from 'mongoose';
import creatorService from './CreatorService';
import {
    scrapeDataCustomWithProxy,
    generateDateRangeAmountStats,
    extractLatestUsers,
    extractTopUsers,
    extractTopUsersTransactions,
    updateAmountStats,
    getChartDatesAmountData,
    getSubsLatestData,
    getTransactionsData,
    getSubsTopDatesData,
    mergeManyChartData,
    mergeManySubsTopData,
    mergeManyTransData,
    getChartWithTotal,
    calculateBestHour,
    getCompositionFromTransactions,
    calculateWeekDaysStats,
    getOpenChatsCountResponseData,
    getVisitorsData,
    chartsToDetStatsMap,
    calculateDetStats,
    aggregateStatistics,
    getChartSubsTransData,
    getTopChattersFromSubsTopData,
    getSubsTransDataRes,
} from '../scraperUtils';
import { formatDate } from '../utils/dates/formatDate';
import { elevateError } from '../errors/elevateError';
import { ICreator } from '../types';
import { validateDatesFilterCreatorIdsInput } from '../validation/datesFilterManyCreatorValidation';
import { getDoubledPreviousStartDate } from '../utils/dates/getDoubledPreviousStartDate';
import { getAdjustedDate } from '../utils/dates/getAdjustedDate';
import {
    getSubsWithExpiredStatSectionPercents,
    getTransStatSectionPercents,
    getTurnoverAndAvgEarnings,
    getTurnoverSumStatSectionPercents,
    toSubsAndFansDaily,
} from '../statUtils';
import {
    MergedChartData,
    TransactionWithUser,
    OpenChatsCount,
} from '../typesStat';
import {
    ChatterDetailed,
    ChatterShort,
    DateAndCount,
    DatesFilterManyCreatorIdsInput,
    DetStatsResponse,
    GetChattersTrackingInput,
    GetCreatorStatisticResponse,
    GetOneChatterTrackingInput,
    GetOverallStatisticResponse,
    OverallDetCompResponse,
    StatisticSection,
} from '../generated/graphql';

class OldService {
    async getChattersTracking(token: string, input: GetChattersTrackingInput) {
        try {
            const { startDate, endDate, creatorId } = input;

            const creator = (await creatorService.getCreatorById(
                creatorId
            )) as ICreator;

            if (!creator.creatorAuth) {
                throw new Error('CreatorAuth is undefined');
            }

            const DATES_FILTER = `?startDate=${startDate}&endDate=${endDate}`;

            const subscriptionTopPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/subscribers/top${DATES_FILTER}&by=total&offset=0`;
            const subscriptionLatestPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/subscribers/latest${DATES_FILTER}&by=total&offset=0`;
            const transactionsPath = `${process.env.ONLYFANS_API_PATH}/payouts/transactions${DATES_FILTER}`;

            const subscriptionTopResponse = await scrapeDataCustomWithProxy(
                subscriptionTopPath,
                creator.creatorAuth
            );
            const subscriptionLatestResponse = await scrapeDataCustomWithProxy(
                subscriptionLatestPath,
                creator.creatorAuth
            );
            const transactionsResponse = await scrapeDataCustomWithProxy(
                transactionsPath,
                creator.creatorAuth
            );

            const topChattersChart = extractTopUsers(
                subscriptionTopResponse.data.users
            ) as ChatterShort[];
            const chatterTable = extractLatestUsers(
                subscriptionLatestResponse.data.users
            ) as ChatterDetailed[];
            const revenueChart = extractTopUsersTransactions(
                transactionsResponse.data.list,
                topChattersChart
            );

            const amountStats = generateDateRangeAmountStats(
                startDate,
                endDate,
                'received'
            );

            revenueChart.forEach((chartItem, index) => {
                if (index < revenueChart.length) {
                    chartItem.receivedHistory = updateAmountStats(
                        amountStats,
                        chartItem.receivedHistory,
                        'received'
                    );
                }
            });

            return {
                topChattersChart,
                revenueChart,
                chatterTable,
            };
        } catch (err) {
            elevateError(err);
        }
    }

    async getOneChatterTracking(
        token: string,
        input: GetOneChatterTrackingInput
    ) {
        try {
            const { startDate, endDate } = input;

            const dateRangeWithZeros = generateDateRangeAmountStats(
                startDate,
                endDate,
                'count'
            );

            /*
                        const creator = await creatorService.getCreatorById(creatorId) as ICreator;

                        if (!creator.creatorAuth) {
                            throw new Error ('CreatorAuth is undefined');
                        }

                        //const subscriptionHistoryPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/${chatterId}/history?startDate=${startDate}&endDate=${endDate}`;
                        const subscriptionHistoryPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/${chatterId}/history?all=1`;
                        const messagesHistoryPath = `${process.env.ONLYFANS_API_PATH}/chats/${chatterId}/messages?limit=1000&order=desc&skip_users=all`;

                        //const subscriptionHistoryResponse = await this.scrapeDataCustom(subscriptionHistoryPath, creator.creatorAuth);
                        //console.log('subscriptionHistoryResponse', subscriptionHistoryResponse.data);

                        const messagesHistoryResponse = await this.scrapeDataCustom(messagesHistoryPath, creator.creatorAuth);
                        const sentMessages = extractSentMessages(messagesHistoryResponse.data.list);
            */
            const sentMessagesChart = dateRangeWithZeros.map((dateObj) => ({
                date: new Date(dateObj.date),
                count: 0,
            }));

            const totalSalesChart = dateRangeWithZeros.map((dateObj) => ({
                date: new Date(dateObj.date).toISOString(),
                ppvRevenue: 0,
                tipsRevenue: 0,
            }));

            const totalSales = {
                chart: totalSalesChart,
                total: 0,
            };

            const ppvPurchaseRate = {
                chart: sentMessagesChart.map((dateObj) => ({
                    ...dateObj,
                    sendPPV: 0,
                    boughtPPV: 0,
                })),
                percent: 0,
            };

            const keystrokes = {
                chart: sentMessagesChart,
                count: 0,
            };

            const onlineTime = {
                activeTime: 3600,
                inActiveTime: 3600,
                onlineTime: 7200,
            };

            return {
                totalSales,
                ppvPurchaseRate,
                sentMessages: {
                    chart: sentMessagesChart,
                    count: 0,
                },
                keystrokes,
                onlineTime,
                date: new Date(),
                totalRevenue: 0,
                newSubs: 0,
                newSubsRevenue: 0,
                recSubsRevenue: 0,
                tipsRevenue: 0,
                messagesRevenue: 0,
                textingRation: 0,
                openChats: 0,
                sellingChats: 0,
                linkClicks: 0,
                conversionRate: 0,
            };
        } catch (err) {
            elevateError(err);
        }
    }

    async getCreatorStatistic(
        token: string,
        input: DatesFilterManyCreatorIdsInput,
        statConnection: mongoose.Connection
    ): Promise<GetCreatorStatisticResponse> {
        try {
            const { startDate, endDate, creatorIds } = input;

            const chartDataPromises = [];
            const subsTopDataPromises = [];
            const transactionsDataPromises = [];

            const creators = (await creatorService.getCreatorsByIds(
                creatorIds,
                token
            )) as ICreator[];
            const tempCreators = [...creators];

            for (const creator of tempCreators) {
                if (!creator.creatorAuth) {
                    throw new Error('CreatorAuth is undefined');
                }

                chartDataPromises.push(
                    getChartDatesAmountData(
                        startDate,
                        endDate,
                        creator.creatorAuth,
                        statConnection
                    )
                );
                subsTopDataPromises.push(
                    getSubsTopDatesData(startDate, endDate, creator.creatorAuth)
                );
                transactionsDataPromises.push(
                    getTransactionsData(
                        startDate,
                        creator.creatorAuth,
                        statConnection
                    )
                );
            }

            const allChartData = await Promise.all(chartDataPromises);
            const allSubsTopData = await Promise.all(subsTopDataPromises);
            const allTransactionsData = await Promise.all(
                transactionsDataPromises
            );

            const chartRespData = mergeManyChartData(allChartData);
            const topFans = mergeManySubsTopData(allSubsTopData);
            const transactionsRespData =
                mergeManyTransData(allTransactionsData);

            const chartAmountTotalAll =
                'chartAmountTotalAll' in chartRespData
                    ? chartRespData.chartAmountTotalAll
                    : [];
            const { turnover, subscription } = getChartWithTotal(
                <MergedChartData>chartRespData
            );
            const daysFromDateFilter = chartAmountTotalAll.length;
            const transactionsData =
                transactionsRespData as TransactionWithUser[];
            const bestHour = calculateBestHour(
                transactionsData,
                daysFromDateFilter
            );
            const amountStats = generateDateRangeAmountStats(
                startDate,
                endDate,
                'amount'
            );
            const composition =
                getCompositionFromTransactions(transactionsData);

            composition.forEach((item) => {
                item.amountStats = updateAmountStats(
                    amountStats,
                    item.amountStats,
                    'amount'
                );
            });

            const bestDay = calculateWeekDaysStats(chartAmountTotalAll);

            return {
                turnover,
                subscription,
                topFans,
                bestDay,
                bestHour,
                composition,
            };
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async getDetailedStatistic(
        token: string,
        input: DatesFilterManyCreatorIdsInput,
        statConnection: mongoose.Connection
    ) {
        try {
            const { startDate, endDate, creatorIds } = input;
            let aggregatedStats: DetStatsResponse[] = [];

            const creators = (await creatorService.getCreatorsByIds(
                creatorIds,
                token
            )) as ICreator[];
            const tempCreators = [...creators];

            for (const creator of tempCreators) {
                if (!creator.creatorAuth) {
                    throw new Error('CreatorAuth is undefined');
                }

                const chartRespPromise = getChartDatesAmountData(
                    startDate,
                    endDate,
                    creator.creatorAuth,
                    statConnection
                ) as Promise<MergedChartData>;

                const subsLatestRespPromise = getSubsLatestData(
                    startDate,
                    endDate,
                    creator.creatorAuth,
                    statConnection
                ) as Promise<StatisticSection>;

                const chattersRespPromise = getOpenChatsCountResponseData(
                    startDate,
                    endDate,
                    creator.creatorAuth,
                    statConnection
                ) as Promise<OpenChatsCount[]>;

                const visitorsRespPromise = getVisitorsData(
                    startDate,
                    endDate,
                    creator.creatorAuth
                ) as Promise<DateAndCount[]>;

                const [
                    chartRespData,
                    subsLatestRespData,
                    chattersRespData,
                    visitorsRespData,
                ] = await Promise.all([
                    chartRespPromise,
                    subsLatestRespPromise,
                    chattersRespPromise,
                    visitorsRespPromise,
                ]);

                const chartAmountTotalAll =
                    'chartAmountTotalAll' in chartRespData
                        ? chartRespData.chartAmountTotalAll
                        : [];
                const detailedStatistics =
                    chartsToDetStatsMap(chartAmountTotalAll);

                const subsChart =
                    'chart' in subsLatestRespData
                        ? subsLatestRespData.chart
                        : [];
                subsChart.forEach((sub) => {
                    const stat = detailedStatistics.find(
                        (d) => formatDate(d.date) === formatDate(sub.date)
                    );
                    if (stat) {
                        stat.newSubs = (stat.newSubs || 0) + sub.count;
                    }
                });

                const chattersData = chattersRespData as OpenChatsCount[];
                chattersData.forEach((chatter) => {
                    const stat = detailedStatistics.find(
                        (d) => formatDate(d.date) === formatDate(chatter.date)
                    );
                    if (stat) {
                        stat.openChats =
                            (stat.openChats || 0) + chatter.openChats;
                        stat.sellingChats =
                            (stat.sellingChats || 0) + chatter.sellingChats;
                    }
                });

                const visitorsData = visitorsRespData as DateAndCount[];
                visitorsData.forEach((visitor) => {
                    const stat = detailedStatistics.find(
                        (d) => formatDate(d.date) === formatDate(visitor.date)
                    );
                    if (stat) {
                        stat.linkClicks =
                            (stat.linkClicks || 0) + visitor.count;
                    }
                });

                const currentResult = calculateDetStats(detailedStatistics);

                aggregatedStats = aggregateStatistics(
                    aggregatedStats,
                    currentResult
                );
            }

            return aggregatedStats;
        } catch (err) {
            elevateError(err);
        }
    }

    async getOverallStatisticOLD(
        token: string,
        input: DatesFilterManyCreatorIdsInput,
        statConnection: mongoose.Connection
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
                subsTopData,
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

            const topFans = getTopChattersFromSubsTopData(
                input.startDate,
                input.endDate,
                subsTopData,
                transactionsRespData
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

    async getOverallDailyStatsOLD(token: string, creatorIds: string[]) {
        try {
            const creators = (await creatorService.getCreatorsByIds(
                creatorIds,
                token
            )) as ICreator[];

            const startDate = getAdjustedDate(-72);
            const endDate = getAdjustedDate(0);

            const { subsLatestRespDataRes, transactionsRespDataRes } =
                await getSubsTransDataRes(creators, startDate, endDate);

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
            elevateError(err);
        }
    }

    async getOverallDetailedComparisonOLD(
        token: string,
        input: DatesFilterManyCreatorIdsInput,
        statConnection: mongoose.Connection
    ): Promise<OverallDetCompResponse[] | null> {
        try {
            const { startDate, endDate, creatorIds } = input;
            const creators = (await creatorService.getCreatorsByIds(
                creatorIds,
                token
            )) as ICreator[];

            const overallResponses: OverallDetCompResponse[] = [];

            for (const creator of creators) {
                if (!creator.creatorAuth) {
                    continue;
                }

                const chartRespPromise = getChartDatesAmountData(
                    startDate,
                    endDate,
                    creator.creatorAuth,
                    statConnection
                ) as Promise<MergedChartData>;

                const subsLatestRespPromise = getSubsLatestData(
                    startDate,
                    endDate,
                    creator.creatorAuth,
                    statConnection
                ) as Promise<StatisticSection>;

                const chattersRespPromise = getOpenChatsCountResponseData(
                    startDate,
                    endDate,
                    creator.creatorAuth,
                    statConnection
                ) as Promise<OpenChatsCount[]>;

                const [chartRespData, subsLatestRespData, chattersRespData] =
                    await Promise.all([
                        chartRespPromise,
                        subsLatestRespPromise,
                        chattersRespPromise,
                    ]);

                let newSubsRevenue = 0;
                let messagesRevenue = 0;
                let tipsRevenue = 0;
                let totalRevenue = 0;

                const sum = 'sum' in chartRespData ? chartRespData.sum : [];
                sum.forEach((item) => {
                    if (item.name === 'subscribes') {
                        newSubsRevenue += item.count;
                    } else if (item.name === 'chat_messages') {
                        messagesRevenue += item.count;
                    } else if (item.name === 'tips') {
                        tipsRevenue += item.count;
                    } else if (item.name === 'total') {
                        totalRevenue += item.count;
                    }
                });

                const newSubs =
                    'total' in subsLatestRespData
                        ? subsLatestRespData.total
                        : 0;
                const chattersData = chattersRespData as OpenChatsCount[];
                const openChats = chattersData.reduce(
                    (total, current) => total + current.openChats,
                    0
                );
                const sellingChats = chattersData.reduce(
                    (total, current) => total + current.sellingChats,
                    0
                );
                const textingRation =
                    newSubsRevenue !== 0
                        ? parseFloat(
                              (messagesRevenue / newSubsRevenue).toFixed(2)
                          )
                        : 0;

                overallResponses.push({
                    creatorId: creator.id,
                    creatorName: creator.userName || '',
                    totalRevenue,
                    newSubs,
                    newSubsRevenue,
                    tipsRevenue,
                    messagesRevenue,
                    textingRation,
                    openChats,
                    sellingChats,
                });
            }

            return overallResponses;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }
}

const oldService = new OldService();
export default oldService;
