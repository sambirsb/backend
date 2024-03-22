import { Connection } from 'mongoose';
import { getChartDataDB, getChatDataDB, getSubsDataDB } from '../';
import { ICreator } from '../../types';
import {
    ChartDataWithCreatorIdAndName,
    ChatsDataWithCreatorIdAndName,
    GetChartSubsChatsData,
    IChat,
    ISubscription,
    MergedChartData,
    SubsDataWithCreatorIdAndName,
} from '../../typesStat';

export const getChartSubsChatsData = async (
    creators: ICreator[],
    startDate: string,
    endDate: string,
    statConnection: Connection
): Promise<GetChartSubsChatsData> => {
    try {
        const chartRespData: ChartDataWithCreatorIdAndName[] = [];
        const subsRespData: SubsDataWithCreatorIdAndName[] = [];
        const chatsRespData: ChatsDataWithCreatorIdAndName[] = [];

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

            const subsRespPromise = getSubsDataDB(
                startDate,
                endDate,
                creator.creatorAuth,
                statConnection
            );

            const chatRespPromise = getChatDataDB(
                startDate,
                endDate,
                creator.creatorAuth,
                statConnection
            );

            const [chartResp, subsResp, chatResp] = await Promise.all([
                chartRespPromise,
                subsRespPromise,
                chatRespPromise,
            ]);

            chartRespData.push(<ChartDataWithCreatorIdAndName>{
                chartRespData: <MergedChartData>chartResp,
                creatorId: creator.id,
                creatorName: creator.userName,
            });

            subsRespData.push(<SubsDataWithCreatorIdAndName>{
                subsRespData: <ISubscription[]>subsResp,
                creatorId: creator.id,
                creatorName: creator.userName,
            });

            chatsRespData.push(<ChatsDataWithCreatorIdAndName>{
                chatsRespData: <IChat[]>chatResp,
                creatorId: creator.id,
                creatorName: creator.userName,
            });
        }

        return {
            chartRespData,
            subsRespData,
            chatsRespData,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
