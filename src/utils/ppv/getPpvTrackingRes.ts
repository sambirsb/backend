import { Connection } from 'mongoose';
import {
    getVaultListCustomDataNoScrap,
    getMessagesFromChatsNoScrap,
} from '../../scraperUtils';
import { calculateTotalPpvRevenue } from '../';
import { calculatePpvRevenue } from './calculatePpvRevenue';
import { calculatePpvStats } from './calculatePpvStats';
import { VaultCustomData } from '../../typesStat';
import { ICreator } from '../../types';
import {
    CreatorAuth,
    PpvTrackingStatistic,
    PpvTrackingVaultResponse,
} from '../../generated/graphql';

export const getPpvTrackingRes = async (
    startDate: Date,
    endDate: Date,
    creators: ICreator[],
    statConnection: Connection
) => {
    try {
        const vaultAndMessagesPromises = creators.map((creator) =>
            Promise.all([
                getVaultListCustomDataNoScrap(
                    creator.creatorAuth as CreatorAuth,
                    statConnection
                ),
                getMessagesFromChatsNoScrap(
                    creator.creatorAuth as CreatorAuth,
                    statConnection
                ),
            ])
        );

        const vaultsAndMessages = await Promise.all(vaultAndMessagesPromises);

        let totalRevenue: PpvTrackingVaultResponse[] = [];
        let totalStatistic: PpvTrackingStatistic[] = [];

        for (const vaultAndMessages of vaultsAndMessages) {
            const [vaultCustomData, { allMessages }] = vaultAndMessages;

            const messagesByDate = allMessages.filter((message) => {
                const messageDate = new Date(message.createdAt);
                return (
                    messageDate >= new Date(startDate) &&
                    messageDate <= new Date(endDate)
                );
            });
            totalRevenue = [
                ...totalRevenue,
                ...calculatePpvRevenue(
                    vaultCustomData as VaultCustomData[],
                    messagesByDate
                ),
            ];

            totalStatistic = [
                ...totalStatistic,
                ...calculatePpvStats(
                    vaultCustomData as VaultCustomData[],
                    messagesByDate
                ),
            ];
        }

        return calculateTotalPpvRevenue(totalRevenue, totalStatistic);
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
