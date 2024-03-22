export const getDoubledPreviousStartDate = (
    startDate: string,
    endDate: string
) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const difference = endDateObj.getTime() - startDateObj.getTime();
    const updatedStartDate = new Date(startDateObj.getTime() - difference);

    return updatedStartDate.toISOString();
};
