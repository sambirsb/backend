export const getDaysDifference = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};
