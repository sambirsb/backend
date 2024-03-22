export const isWithinPeriod = (
    date: Date,
    startDate: Date,
    endDate: Date
): boolean => {
    return date >= startDate && date < endDate;
};
