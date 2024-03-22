import { TransactionType } from '../constants/TransactionType';

export interface GetTransactionResponse {
    user_id: string;
    preUpdateDate: string;
    transactions: TransactionWithUser[];
}

export interface TransactionWithUser {
    _id: string;
    user_id: number;
    transactionType: TransactionType;
    friend_user_id: UserForTransaction;
    transactionDate: string;
    description: string;
    amount: number;
    otherOM: {
        vatAmount: number;
        net: number;
        fee: number;
        currency: string;
        status: string;
    };
}

export interface UserForTransaction {
    _id: string;
    pathId: string;
    avatarURL: string;
    userName: string;
}
