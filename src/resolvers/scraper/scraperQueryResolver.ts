import authService from '../../services/AuthService';
import scraperService from '../../services/ScraperService';
import updateScrapeService from '../../services/UpdateScrapeService';
import oldService from '../../services/OldService';
import statsOFScraperService from '../../servicesStat/StatsOFService';
import { elevateError } from '../../errors/elevateError';
import {
    DatesFilterManyCreatorIdsInput,
    GetDatesCreatorIdInput,
    GetOneChatterTrackingInput,
} from '../../generated/graphql';

const scraperQueryResolver = {
    Query: {
        async getPublicDataFromLink(
            _: never,
            { link }: { link: string },
            context: any
        ) {
            authService.checkToken(context.token);

            try {
                return await scraperService.getPublicData(
                    link,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getCreatorStatisticOLD(
            _: never,
            { input }: { input: DatesFilterManyCreatorIdsInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await oldService.getCreatorStatistic(
                    token,
                    input,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getOldChattersTracking(
            _: never,
            { input }: { input: GetDatesCreatorIdInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await oldService.getChattersTracking(token, input);
            } catch (err) {
                elevateError(err);
            }
        },

        async getOneChatterTracking(
            _: never,
            { input }: { input: GetOneChatterTrackingInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await oldService.getOneChatterTracking(token, input);
            } catch (err) {
                elevateError(err);
            }
        },

        async getDetailedStatisticOLD(
            _: never,
            { input }: { input: DatesFilterManyCreatorIdsInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await oldService.getDetailedStatistic(
                    token,
                    input,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getOverallStatisticOLD(
            _: never,
            { input }: { input: DatesFilterManyCreatorIdsInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await oldService.getOverallStatisticOLD(
                    token,
                    input,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async updateCreatorsStats(
            _: never,
            { creatorIds }: { creatorIds: string[] },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await updateScrapeService.updateCreatorsStats(
                    token,
                    creatorIds,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getOFStats(
            _: never,
            { input }: { input: DatesFilterManyCreatorIdsInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await statsOFScraperService.getOFStats(
                    token,
                    input,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getOFDetailedStats(
            _: never,
            { input }: { input: DatesFilterManyCreatorIdsInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await statsOFScraperService.getOFDetailedStats(
                    token,
                    input,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default scraperQueryResolver;
