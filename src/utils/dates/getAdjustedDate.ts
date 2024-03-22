export const getAdjustedDate = (hours: number): string => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + hours);

    return currentDate.toISOString();
};
