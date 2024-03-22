import { TransactionWithUser } from '../../typesStat/TransactionTypes';

export const mergeManyTransData = (
    allTransactionsData: TransactionWithUser[][]
): TransactionWithUser[] => {
    let mergedTransactions: TransactionWithUser[] = [];

    allTransactionsData.forEach((transactionsData) => {
        mergedTransactions = [...mergedTransactions, ...transactionsData];
    });

    return mergedTransactions;
};
