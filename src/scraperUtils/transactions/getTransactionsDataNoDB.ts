import { getTransactionsScrapedData } from '../index';
import { mergeTransactionData } from './mergeTransactionData';
import { TransactionWithUser } from '../../typesStat/TransactionTypes';
import { CreatorAuth } from '../../generated/graphql';

export const getTransactionsDataNoDB = async (
    startDate: string,
    creatorAuth: CreatorAuth
): Promise<TransactionWithUser[]> => {
    try {
        const transactionsData = await getTransactionsScrapedData(
            startDate,
            creatorAuth
        );

        const data = mergeTransactionData([], transactionsData.list);

        return data as TransactionWithUser[];
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
