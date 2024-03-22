import { ICreator } from '../../types';

export const getLastUpdateDate = (creator: ICreator): Date => {
    const selectedDate = new Date(
        creator.lastUpdatedDate ? creator.lastUpdatedDate : creator.joinDate
    );

    selectedDate.setDate(selectedDate.getDate() - 1);

    return selectedDate;
};
