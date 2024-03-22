import authService from '../../services/AuthService';
import { elevateError } from '../../errors/elevateError';
import chatterTrackingService from '../../servicesStat/ChatterTrackingService';
import { DatesFilterInput } from '../../generated/graphql';

const chatterTrackingQueryResolver = {
    Query: {
        async getChatterTrackingApp(
            _: never,
            { teamMemberId }: { teamMemberId: string },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                return await chatterTrackingService.getChatterTrackingApp(
                    teamMemberId,
                    token,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
                throw new Error('Error receiving chatter tracking.');
            }
        },

        async getChatterTracking(
            _: never,
            { input }: { input: DatesFilterInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await chatterTrackingService.getChatterTracking(
                    input,
                    token,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
                throw new Error('Error receiving chatter tracking.');
            }
        },
    },
};

export default chatterTrackingQueryResolver;
