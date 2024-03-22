export const getAvgSumCount = (sum: number, count: number) => {
    if (count === 0 || sum === 0) {
        return 0;
    }

    return sum / count;
};
