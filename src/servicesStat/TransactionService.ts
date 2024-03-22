import { Connection } from 'mongoose';
import TransactionModel from '../modelsStat/TransactionModel';
import PublicDataModel from '../modelsStat/PublicDataModel';
import publicDataService from './PublicDataService';
import { formatDate, getEarlierDate } from '../utils';
import { getTransactionType } from '../scraperUtils';
import {
    OFTransactionsResponseData,
    ITransaction,
    GetTransactionResponse,
    TransactionWithUser,
    UserForTransaction,
} from '../typesStat';

class TransactionService {
    async getTransactions(
        startDate: string,
        user_id: string,
        statConnection: Connection
    ): Promise<GetTransactionResponse> {
        try {
            const TransactionModelObj = TransactionModel(statConnection);
            const PublicDataModelObj = PublicDataModel(statConnection);

            const transactions = (await TransactionModelObj.find({
                user_id,
                transactionDate: {
                    $gte: formatDate(startDate),
                },
            }).populate({
                path: 'friend_user_id',
                model: PublicDataModelObj,
            })) as ITransaction[];

            const populatedTransactions: TransactionWithUser[] =
                transactions.map((transaction) => {
                    const transactionObject = transaction.toObject();

                    return {
                        ...transactionObject,
                        friend_user_id:
                            transactionObject.friend_user_id as UserForTransaction,
                    };
                });

            if (!populatedTransactions || populatedTransactions.length === 0) {
                return {
                    user_id,
                    preUpdateDate: startDate,
                    transactions: [],
                };
            }

            return {
                user_id,
                preUpdateDate: getEarlierDate(
                    transactions[0].transactionDate,
                    1
                ),
                transactions: populatedTransactions,
            };
        } catch (err: any) {
            console.error('Error:', err.data);
            throw err;
        }
    }

    async updateTransactions(
        data: OFTransactionsResponseData,
        user_id: string,
        statConnection: Connection
    ) {
        try {
            const TransactionModelObj = TransactionModel(statConnection);

            const friendUserNames = [
                ...new Set(data.list.map((t) => t.user.username)),
            ];
            await publicDataService.scrapedMissingPublicData(
                friendUserNames,
                statConnection
            );

            for (let i = 0; i < data.list.length; i++) {
                const transactionType = getTransactionType(
                    data.list[i].description
                );

                const transactionData = {
                    user_id: Number(user_id),
                    transactionType,
                    friend_user_id: data.list[i].user.id,
                    transactionDate: data.list[i].createdAt,
                    description: data.list[i].description,
                    amount: data.list[i].amount,
                    otherOM: {
                        vatAmount: data.list[i].vatAmount,
                        net: data.list[i].net,
                        fee: data.list[i].fee,
                        currency: data.list[i].currency,
                        status: data.list[i].status,
                    },
                };

                const updatedTransaction =
                    await TransactionModelObj.findOneAndUpdate(
                        {
                            user_id: Number(user_id),
                            transactionDate: transactionData.transactionDate,
                            transactionType: transactionData.transactionType,
                        },
                        transactionData,
                        { new: true, upsert: false }
                    );

                if (!updatedTransaction) {
                    await TransactionModelObj.create(transactionData);
                }
            }
        } catch (err: any) {
            console.error('Error:', err.data);
            throw err;
        }
    }
}

const transactionService = new TransactionService();
export default transactionService;
