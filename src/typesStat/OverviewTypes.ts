import { MergedChartData } from './ChartDatesAmount';
import { ISubscription } from './ISubscription';
import { IChat } from './IChat';

export interface ChartDataWithCreatorIdAndName {
    chartRespData: MergedChartData;
    creatorId: string;
    creatorName: string;
}

export interface SubsDataWithCreatorIdAndName {
    subsRespData: ISubscription[];
    creatorId: string;
    creatorName: string;
}

export interface ChatsDataWithCreatorIdAndName {
    chatsRespData: IChat[];
    creatorId: string;
    creatorName: string;
}

export interface GetChartSubsChatsData {
    chartRespData: ChartDataWithCreatorIdAndName[];
    subsRespData: SubsDataWithCreatorIdAndName[];
    chatsRespData: ChatsDataWithCreatorIdAndName[];
}

export interface SumRevenues {
    totalRevenue: number;
    subscribes: number;
    tips: number;
    post: number;
    chat_messages: number;
    ref: number;
    stream: number;
}

export interface SumRevenuesWithCreatorIdAndName {
    creatorId: string;
    creatorName: string;
    sumRevenues: SumRevenues;
}

export interface NewSubsCountWithCreatorIdAndName {
    creatorId: string;
    creatorName: string;
    newSubsCount: number;
}

export interface OpenChatsCountWithCreatorIdAndName {
    creatorId: string;
    creatorName: string;
    openChats: number;
    sellingChats: number;
}
