import { ChartAmountAll } from '../../typesStat/ChartDatesAmount';

export const updateSumMap = (
    sumMap: Map<string, number>,
    data: ChartAmountAll | { [key: string]: number }
) => {
    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'date') {
            sumMap.set(key, (sumMap.get(key) || 0) + value);
        }
    });
};
