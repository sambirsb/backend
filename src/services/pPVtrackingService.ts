import mongoose, { Connection } from 'mongoose';
import creatorService from './CreatorService';
import { getPpvTrackingRes } from '../utils/ppv/getPpvTrackingRes';
import {
    getMessagesFromChatsNoScrap,
    getOneVaultCustomDataNoScrap,
    getPpvFromTracking,
    toGetPpvTrackingR,
    toPpvTrackingMessage,
} from '../scraperUtils';
import { elevateError } from '../errors/elevateError';
import { ICreator } from '../types';
import {
    CreatorAuth,
    GetPpvTrackingInput,
    GetPpvTrackingVaultInput,
    GetPpvTrackingVaultMessagesInput,
    PpvTrackingResponse,
    PpvTrackingVaultResponse,
} from '../generated/graphql';

class PpvTrackingService {
    async getPPVTracking(
        token: string,
        input: GetPpvTrackingInput,
        statConnection: Connection
    ): Promise<PpvTrackingResponse> {
        const creators: ICreator[] = await creatorService.getCreatorsByIds(
            input.creatorIds,
            token
        );

        return await getPpvTrackingRes(
            input.startDate,
            input.endDate,
            creators,
            statConnection
        );
    }

    async getPPVTrackingVault(
        token: string,
        input: GetPpvTrackingVaultInput,
        statConnection: mongoose.Connection
    ): Promise<PpvTrackingVaultResponse> {
        try {
            const { creatorId, vaultId } = input;

            const creatorAuth = (await creatorService.getCreatorAuthByCreatorId(
                token,
                creatorId
            )) as CreatorAuth;

            const customVault = (await getOneVaultCustomDataNoScrap(
                vaultId,
                creatorAuth,
                statConnection
            )) as any;

            const { ppvMessages } = await getMessagesFromChatsNoScrap(
                creatorAuth,
                statConnection
            );

            return await toGetPpvTrackingR(customVault, ppvMessages);
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async getPPVTrackingFolderMessages(
        token: string,
        input: GetPpvTrackingVaultMessagesInput,
        statConnection: mongoose.Connection
    ) {
        try {
            const { creatorId, vaultId, ppvId } = input;

            const creatorAuth = (await creatorService.getCreatorAuthByCreatorId(
                token,
                creatorId
            )) as CreatorAuth;

            const customVault: any = await getOneVaultCustomDataNoScrap(
                vaultId,
                creatorAuth,
                statConnection
            );
            const { ppvMessages } = await getMessagesFromChatsNoScrap(
                creatorAuth,
                statConnection
            );
            const ppvTracking = await toGetPpvTrackingR(
                customVault,
                ppvMessages
            );

            const ppv = await getPpvFromTracking(ppvTracking, ppvId);

            return toPpvTrackingMessage(ppv);
        } catch (err) {
            elevateError(err);
        }
    }
}

const pPvTrackingService = new PpvTrackingService();
export default pPvTrackingService;
