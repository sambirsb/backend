export const generateDateRangeAmountStats = (
    startDate: string,
    endDate: string,
    valueName: string
) => {
    const dateArray = [];
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        dateArray.push({
            date: currentDate.toISOString().split('T')[0],
            [valueName]: 0,
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
};
