import mongoose from 'mongoose';
import transactionService from '../../servicesStat/TransactionService';
import { getTransactionsScrapedData, mergeTransactionData } from '../';
import { getUserIdFromCreatorAuth } from '../../utils';
import { TransactionWithUser } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getTransactionsData = async (
    startDate: string,
    creatorAuth: CreatorAuth,
    statConnection: mongoose.Connection
): Promise<TransactionWithUser[]> => {
    try {
        const user_id = await getUserIdFromCreatorAuth(creatorAuth);
        const transactions = await transactionService.getTransactions(
            startDate,
            user_id,
            statConnection
        );
        const updatedDate = new Date(transactions.preUpdateDate).toISOString();

        const transactionsData = await getTransactionsScrapedData(
            updatedDate,
            creatorAuth
        );

        const data = mergeTransactionData(
            transactions.transactions,
            transactionsData.list
        );

        return data as TransactionWithUser[];
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
