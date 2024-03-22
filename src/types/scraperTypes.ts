import { MergedChartData } from '../typesStat/ChartDatesAmount';
import { SubsWithExpired } from '../typesStat/SubsTypes';

interface ScraperPrivateInput {
    cookie: OnlyFansCookie;
    user_id: string;
    url: string;
}

interface OnlyFansCookie {
    csrf: string;
    auth_id: string;
    auth_uid_379807379: string;
    sess: string;
    st: string;
}

interface ChartCreatorData {
    creatorId: string;
    creatorName: string;
    chartData: MergedChartData;
}

interface SubsLatestData {
    creatorId: string;
    subsLatestData: SubsWithExpired;
}

interface GetChartSubsDataForEachCreator {
    chartDataArr: ChartCreatorData[];
    subsLatestDataArr: SubsLatestData[];
}

export type {
    ScraperPrivateInput,
    ChartCreatorData,
    SubsLatestData,
    GetChartSubsDataForEachCreator,
};
