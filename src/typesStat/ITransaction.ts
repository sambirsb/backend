import { Document, Types } from 'mongoose';
import { TransactionType } from '../constants/TransactionType';

export interface ITransaction extends Document {
    _id: Types.ObjectId;
    user_id: number;
    transactionType: TransactionType;
    friend_user_id: number;
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
