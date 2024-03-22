import {
    NewSubsCountWithCreatorIdAndName,
    SubsDataWithCreatorIdAndName,
} from '../../typesStat';

export const getNewSubsCount = async (
    subs: SubsDataWithCreatorIdAndName[]
): Promise<NewSubsCountWithCreatorIdAndName[]> => {
    try {
        return subs.map(({ creatorId, creatorName, subsRespData }) => {
            const newSubsCount = subsRespData.length;

            return {
                creatorId,
                creatorName,
                newSubsCount,
            };
        });
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
