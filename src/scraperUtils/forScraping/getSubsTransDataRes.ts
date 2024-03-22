import { getTransactionsDataNoDB, getSubsLatestCountsNoDB } from '../';
import { mergeSubsCounts } from '../../statUtils';
import { ICreator } from '../../types';
import { TransactionWithUser, SubsLatestCountsDaily } from '../../typesStat';

interface GetSubsTransDataRes {
    subsLatestRespDataRes: SubsLatestCountsDaily[];
    transactionsRespDataRes: TransactionWithUser[];
}

export const getSubsTransDataRes = async (
    creators: ICreator[],
    startDate: string,
    endDate: string
): Promise<GetSubsTransDataRes> => {
    const subsLatestRespDataSum: SubsLatestCountsDaily[][] = [];
    const transactionsRespDataSum: TransactionWithUser[][] = [];
    const tempCreators = [...creators];

    for (const creator of tempCreators) {
        if (!creator.creatorAuth) {
            throw new Error('CreatorAuth is undefined');
        }

        const subsLatestRespPromise = getSubsLatestCountsNoDB(
            startDate,
            endDate,
            creator.creatorAuth
        );

        const transactionsRespPromise = getTransactionsDataNoDB(
            startDate,
            creator.creatorAuth
        );

        const [subsLatestRespData, transactionsRespData] = await Promise.all([
            subsLatestRespPromise,
            transactionsRespPromise,
        ]);

        const subsLatestRespDataRes =
            subsLatestRespData as SubsLatestCountsDaily[];
        subsLatestRespDataSum.push(subsLatestRespDataRes);
        const transactionsRespDataRes =
            transactionsRespData as TransactionWithUser[];
        transactionsRespDataSum.push(transactionsRespDataRes);
    }

    return {
        subsLatestRespDataRes: mergeSubsCounts(subsLatestRespDataSum),
        transactionsRespDataRes: transactionsRespDataSum.flat(),
    };
};
