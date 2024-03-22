export const getDatesFilterDB = (startDate: Date, endDate: Date) => {
    return {
        startDate: { $gte: new Date(startDate) },
        endDate: { $lte: new Date(endDate) },
    };
};
