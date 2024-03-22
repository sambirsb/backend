export const getPercent = (current: number, previous: number): number => {
    if (previous === 0) {
        if (current === 0) {
            return 0;
        } else {
            return current > 0 ? 100 : -100;
        }
    }

    const percentChange = ((current - previous) / previous) * 100;

    return parseFloat(percentChange.toFixed(2));
};
