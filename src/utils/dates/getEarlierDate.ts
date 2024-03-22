export const getEarlierDate = (actionDate: string, daysToSubtract: number) => {
    const date = new Date(actionDate);
    date.setDate(date.getDate() - daysToSubtract);

    return date.toISOString();
};
