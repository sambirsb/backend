export const checkDatesDifference = (
    date1: Date,
    date2: Date,
    differenceInMinutes: number
) => {
    const difference = Math.abs(date1.getTime() - date2.getTime());
    const minutesDifference = difference / (1000 * 60);

    return minutesDifference >= differenceInMinutes;
};
