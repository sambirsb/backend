import { WeekDay } from '../constants/weekDay';
import { getTransactionType } from '../scraperUtils';
import {
    ChartAmountTotalAll,
    GetChartWithTotal,
    MergedChartData,
} from '../typesStat/ChartDatesAmount';
import { TransactionWithUser } from '../typesStat/TransactionTypes';
import {
    Best,
    ChatterShort,
    Composition,
    DateAndCount,
    RevenueChart,
} from '../generated/graphql';

export const getChartWithTotal = (data: MergedChartData): GetChartWithTotal => {
    const turnoverChart: DateAndCount[] = data.chartAmountTotalAll.map(
        (item) => ({
            date: item.date,
            count: item.total,
        })
    );
    const subscriptionChart: DateAndCount[] = data.chartAmountTotalAll.map(
        (item) => ({
            date: item.date,
            count: item.subscribes,
        })
    );

    const totalTurnover = turnoverChart.reduce(
        (acc, curr) => acc + (curr.count ?? 0),
        0
    );
    const totalSubscription = subscriptionChart.reduce(
        (acc, curr) => acc + (curr.count ?? 0),
        0
    );

    return {
        turnover: {
            chart: turnoverChart,
            total: totalTurnover,
        },
        subscription: {
            chart: subscriptionChart,
            total: totalSubscription,
        },
    };
};

export const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);

    return date.getDay() as WeekDay;
};

export const calculateWeekDaysStats = (data: ChartAmountTotalAll[]): Best[] => {
    const sums = Array(7).fill(0);
    const counts = Array(7).fill(0);

    data.forEach((item) => {
        const dayOfWeek = getDayOfWeek(item.date);
        sums[dayOfWeek] += item.total;
        counts[dayOfWeek]++;
    });

    return sums.map((sum, i) => ({
        name: WeekDay[i],
        average: counts[i] ? parseFloat((sum / counts[i]).toFixed(2)) : 0,
    }));
};

export const calculateBestHour = (
    transactions: TransactionWithUser[],
    daysFromDateFilter: number
): Best[] => {
    const segmentLength = 4;
    const segmentsPerDay = 24 / segmentLength;
    const sums = new Array(segmentsPerDay).fill(0);

    transactions.forEach((transaction) => {
        const createdAt = new Date(transaction.transactionDate);
        const hour = createdAt.getUTCHours();
        const segmentIndex = Math.floor(hour / segmentLength);
        sums[segmentIndex] += transaction.amount;
    });

    const averages = sums.map((sum, i) => ({
        name: `${i * segmentLength}-${(i + 1) * segmentLength} h`,
        average: (sum / daysFromDateFilter).toFixed(2),
    })) as any;

    return averages as Best[];
};

export const getCompositionFromTransactions = (
    transactions: TransactionWithUser[]
): Composition[] => {
    const composition: any = {};

    transactions.forEach((transaction) => {
        const type = getTransactionType(transaction.description) as any;
        if (!composition[type]) {
            composition[type] = [];
        }

        if (!composition['tip']) {
            composition['tip'] = [];
        }

        if (!composition['subscription']) {
            composition['subscription'] = [];
        }

        if (!composition['message']) {
            composition['message'] = [];
        }

        composition[type].push({
            date: new Date(transaction.transactionDate),
            amount: transaction.amount || 0,
        });
    });

    return Object.keys(composition).map((type) => ({
        type: type,
        amountStats: composition[type],
    }));
};

export const updateAmountStats = (
    baseAmountStats: any,
    transactionAmountStats: any,
    keyToUpdate: string
) => {
    const updatedStats = baseAmountStats.map((stat: any) => ({ ...stat }));
    if (transactionAmountStats !== undefined) {
        transactionAmountStats.forEach((transaction: any) => {
            const transactionDate = new Date(transaction.date)
                .toISOString()
                .split('T')[0];

            const matchingStat = updatedStats.find(
                (stat: any) => stat.date === transactionDate
            );

            if (matchingStat && transaction[keyToUpdate] !== undefined) {
                matchingStat[keyToUpdate] += transaction[keyToUpdate];
            }
        });
    } else {
        baseAmountStats.forEach((transaction: any) => {
            const transactionDate = new Date(transaction.date)
                .toISOString()
                .split('T')[0];

            const matchingStat = updatedStats.find(
                (stat: any) => stat.date === transactionDate
            );

            if (matchingStat && transaction[keyToUpdate] !== undefined) {
                matchingStat[keyToUpdate] += transaction[keyToUpdate];
            }
        });
    }
    return updatedStats;
};

export const extractTopUsers = (data: any) => {
    if (!data) {
        return [];
    }

    return data.map((user: any) => ({
        name: user.name,
        received: user.subscribedOnData ? user.subscribedOnData.totalSumm : 0,
    }));
};

export const extractTopUsersTransactions = (
    transactions: any[],
    topUsers: ChatterShort[]
): RevenueChart[] => {
    if (!transactions || !topUsers) {
        return [];
    }

    const filteredTransactions = transactions.filter((transaction) =>
        topUsers.some((user) => user.name === transaction.user.name)
    );

    const usersRevenue: { [key: string]: RevenueChart } =
        filteredTransactions.reduce((acc, transaction) => {
            const userName = transaction.user.name;
            if (!acc[userName]) {
                acc[userName] = { name: userName, receivedHistory: [] };
            }
            acc[userName].receivedHistory.push({
                date: new Date(transaction.createdAt),
                received: transaction.amount,
            });
            return acc;
        }, {});

    return Object.values(usersRevenue);
};

export const extractLatestUsers = (data: any) => {
    if (!data) {
        return [];
    }

    return data.map((user: any) => ({
        id: user.id,
        name: user.name,
        totalRevenue: user.subscribedOnData
            ? user.subscribedOnData.totalSumm
            : 0,
    }));
};
