export const isTimeSpanLongerThan = (
    date1: Date,
    date2: Date,
    days: number
) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const differenceInTime = Math.abs(date2.getTime() - date1.getTime());
    const differenceInDays = differenceInTime / oneDay;

    return differenceInDays > days;
};
