import { getTransactionType } from './getTransactionType';
import { OFTransaction } from '../../typesStat/fromOF/OFTransactionsResponseData';
import { TransactionWithUser } from '../../typesStat/TransactionTypes';
import { ITransaction } from '../../typesStat/ITransaction';

export const mergeTransactionData = (
    transactionsDB: TransactionWithUser[],
    transactionsAPI: OFTransaction[]
): (ITransaction | TransactionWithUser)[] => {
    const existingTransactionIds = new Set(
        transactionsDB.map((t) => t._id.toString())
    );
    const newTransactions: TransactionWithUser[] = [];

    transactionsAPI.forEach((apiTransaction) => {
        if (!existingTransactionIds.has(apiTransaction.id)) {
            const newTransaction: TransactionWithUser = {
                _id: apiTransaction.id,
                user_id: apiTransaction.user.id,
                transactionType: getTransactionType(apiTransaction.description),
                friend_user_id: {
                    _id: apiTransaction.user.id.toString(),
                    pathId: apiTransaction.user.username || '',
                    avatarURL: apiTransaction.user.avatar || '',
                    userName: apiTransaction.user.name || '',
                },
                transactionDate: apiTransaction.createdAt,
                description: apiTransaction.description,
                amount: apiTransaction.amount,
                otherOM: {
                    vatAmount: apiTransaction.vatAmount,
                    net: apiTransaction.net,
                    fee: apiTransaction.fee,
                    currency: apiTransaction.currency,
                    status: apiTransaction.status,
                },
            };
            newTransactions.push(newTransaction);
        }
    });

    return [...transactionsDB, ...newTransactions];
};
