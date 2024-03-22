import mongoose, { Schema } from 'mongoose';
import { TransactionType } from '../constants/TransactionType';
import { ITransaction } from '../typesStat/ITransaction';

const transactionModelSchema = new Schema<ITransaction>({
    user_id: {
        type: mongoose.Schema.Types.Number,
        ref: 'public_data',
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
        enum: Object.values(TransactionType),
    },
    friend_user_id: {
        type: mongoose.Schema.Types.Number,
        ref: 'public_data',
        required: true,
    },
    transactionDate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    otherOM: {
        vatAmount: Number,
        net: Number,
        fee: Number,
        currency: String,
        status: String,
    },
});

const TransactionModel = (connection: mongoose.Connection) => {
    return connection.model('transactions', transactionModelSchema);
};

export default TransactionModel;
