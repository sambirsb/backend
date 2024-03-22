import { TransactionType } from '../../constants/TransactionType';

export const getTransactionType = (description: string): TransactionType => {
    switch (true) {
        case description
            .toLowerCase()
            .includes(TransactionType.MESSAGE as string):
            return TransactionType.MESSAGE;
        case description.toLowerCase().includes(TransactionType.TIP as string):
            return TransactionType.TIP;
        case description
            .toLowerCase()
            .includes(TransactionType.SUBSCRIPTION as string):
            return TransactionType.SUBSCRIPTION;
        default:
            return TransactionType.OTHER;
    }
};
