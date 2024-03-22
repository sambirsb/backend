import authService from '../../services/AuthService';
import pPvTrackingService from '../../services/pPVtrackingService';
import { elevateError } from '../../errors/elevateError';
import {
    GetPpvTrackingVaultMessagesInput,
    GetPpvTrackingVaultInput,
    GetPpvTrackingInput,
} from '../../generated/graphql';

const pPVTrackingQueryResolver = {
    Query: {
        async getPPVTracking(
            _: never,
            { input }: { input: GetPpvTrackingInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                return await pPvTrackingService.getPPVTracking(
                    token,
                    input,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getPPVTrackingVault(
            _: never,
            { input }: { input: GetPpvTrackingVaultInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await pPvTrackingService.getPPVTrackingVault(
                    token,
                    input,
                    context.statConnection
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async getPPVTrackingVaultMessages(
            _: never,
            { input }: { input: GetPpvTrackingVaultMessagesInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await pPvTrackingService.getPPVTrackingFolderMessages(
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

export default pPVTrackingQueryResolver;
