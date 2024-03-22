export const get2Last24hPeriods = (startDate: string) => {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(startDateTime);
    endDateTime.setDate(endDateTime.getDate() + 3);

    const period24hAgo = new Date(endDateTime);
    period24hAgo.setDate(period24hAgo.getDate() - 1);
    const period48hAgo = new Date(endDateTime);
    period48hAgo.setDate(period48hAgo.getDate() - 2);
    const period72hAgo = new Date(endDateTime);
    period72hAgo.setDate(period72hAgo.getDate() - 3);

    return {
        endDateTime,
        period24hAgo,
        period48hAgo,
        period72hAgo,
    };
};
