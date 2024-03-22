import { TotalChartType } from '../../typesStat';

export const getTotalSum = (sum: TotalChartType[]): number => {
    return sum.reduce((total, item) => total + item.count, 0);
};
