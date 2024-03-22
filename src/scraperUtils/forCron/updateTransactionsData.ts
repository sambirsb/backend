import { Connection } from 'mongoose';
import transactionService from '../../servicesStat/TransactionService';
import { getTransactionsScrapedData } from '../index';
import { elevateError } from '../../errors/elevateError';
import { ICreator } from '../../types';

export const updateTransactionsData = async (
    lastUpdatedDate: Date,
    creator: ICreator,
    connection: Connection
) => {
    try {
        const user_id = creator.creatorAuth?.user_id;

        if (!creator.creatorAuth || !user_id) {
            throw new Error('CreatorAuth is undefined');
        }

        const actualData = await getTransactionsScrapedData(
            lastUpdatedDate.toISOString(),
            creator.creatorAuth
        );

        if (!actualData) return;

        await transactionService.updateTransactions(
            actualData,
            user_id,
            connection
        );
    } catch (err) {
        elevateError(err);
    }
};
