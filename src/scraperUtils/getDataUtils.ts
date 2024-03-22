export const getDatesFilter = async (startDate: string, endDate: string) => {
    return `?startDate=${startDate}&endDate=${endDate}`;
};

export const getStartDateFilter = async (startDate: string) => {
    return `?startDate=${startDate}`;
};
