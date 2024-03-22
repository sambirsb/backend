import { Connection } from 'mongoose';
import { getSubsLatestCounts, getTransDataDB, mergeSubsCounts } from '../';
import { ICreator } from '../../types';
import { TransactionWithUser, SubsLatestCountsDaily } from '../../typesStat';

interface GetSubsTransDataRes {
    subsLatestRespDataRes: SubsLatestCountsDaily[];
    transactionsRespDataRes: TransactionWithUser[];
}

export const getSubsTransDataRes = async (
    creators: ICreator[],
    startDate: string,
    endDate: string,
    statConnection: Connection
): Promise<GetSubsTransDataRes> => {
    const subsLatestRespDataSum: SubsLatestCountsDaily[][] = [];
    const transactionsRespDataSum: TransactionWithUser[][] = [];
    const tempCreators = [...creators];

    for (const creator of tempCreators) {
        if (!creator.creatorAuth) {
            throw new Error('CreatorAuth is undefined');
        }

        const subsLatestRespPromise = getSubsLatestCounts(
            startDate,
            endDate,
            creator.creatorAuth,
            statConnection
        );

        const transactionsRespPromise = getTransDataDB(
            startDate,
            creator.creatorAuth,
            statConnection
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
