import { Connection } from 'mongoose';
import transactionService from '../../servicesStat/TransactionService';
import { getUserIdFromCreatorAuth } from '../../utils';
import { TransactionWithUser } from '../../typesStat';
import { CreatorAuth } from '../../generated/graphql';

export const getTransDataDB = async (
    startDate: string,
    creatorAuth: CreatorAuth,
    statConnection: Connection
): Promise<TransactionWithUser[]> => {
    try {
        const user_id = await getUserIdFromCreatorAuth(creatorAuth);
        const data = await transactionService.getTransactions(
            startDate,
            user_id,
            statConnection
        );

        return data.transactions;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
