import authService from '../../services/AuthService';
import overviewService from '../../servicesStat/OverviewService';
import { elevateError } from '../../errors/elevateError';
import { DatesFilterManyCreatorIdsInput } from '../../generated/graphql';

const overviewQueryResolver = {
    Query: {
        async getOverallDailyStats(
            _: never,
            { creatorIds }: { creatorIds: string[] },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await overviewService.getOverallDailyStats(
                    token,
                    creatorIds,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getOverallStatistic(
            _: never,
            { input }: { input: DatesFilterManyCreatorIdsInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await overviewService.getOverallStatistic(
                    token,
                    input,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getOverallDetailedComparison(
            _: never,
            { input }: { input: DatesFilterManyCreatorIdsInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await overviewService.getOverallDetComp(
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

export default overviewQueryResolver;
