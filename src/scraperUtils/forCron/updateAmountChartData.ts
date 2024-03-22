import { Connection } from 'mongoose';
import { MAX_PERIOD_UPDATE_SCRAPER_DAYS } from '../../constants/others';
import chartService from '../../servicesStat/ChartService';
import { getChartScraperData } from '../';
import { isTimeSpanLongerThan, generateDateIntervals } from '../../utils';
import { elevateError } from '../../errors/elevateError';
import { ICreator } from '../../types';
import { OFChartDatesAmountResponse } from '../../typesStat';

export const updateAmountChartData = async (
    lastUpdatedDate: Date,
    creator: ICreator,
    connection: Connection
) => {
    try {
        const user_id = creator.creatorAuth?.user_id;
        const currentDate = new Date();

        if (!creator.creatorAuth || !user_id) {
            throw new Error('CreatorAuth is undefined');
        }

        const needToBeDivided = !isTimeSpanLongerThan(
            lastUpdatedDate,
            currentDate,
            MAX_PERIOD_UPDATE_SCRAPER_DAYS
        );

        let dataFetchPromises: Promise<OFChartDatesAmountResponse>[] = [];

        if (needToBeDivided) {
            const intervals = generateDateIntervals(
                lastUpdatedDate,
                currentDate,
                MAX_PERIOD_UPDATE_SCRAPER_DAYS
            );

            dataFetchPromises = intervals.map((interval) =>
                getChartScraperData(
                    interval.startDate.toISOString(),
                    interval.endDate.toISOString(),
                    creator.creatorAuth
                )
            );
        } else {
            dataFetchPromises.push(
                getChartScraperData(
                    lastUpdatedDate.toISOString(),
                    currentDate.toISOString(),
                    creator.creatorAuth
                )
            );
        }

        const fetchedData: OFChartDatesAmountResponse[] =
            await Promise.all(dataFetchPromises);

        const updateChartsPromises = fetchedData.map((data) =>
            chartService.updateCharts(data, user_id, connection)
        );

        await Promise.all(updateChartsPromises);
    } catch (err) {
        elevateError(err);
    }
};
