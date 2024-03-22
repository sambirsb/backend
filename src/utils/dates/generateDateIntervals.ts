export interface IDateInterval {
    startDate: Date;
    endDate: Date;
}
export const generateDateIntervals = (
    startDate: Date,
    endDate: Date,
    interval: number
): IDateInterval[] => {
    const intervals: IDateInterval[] = [];

    let currentStart = startDate;
    let currentEnd = new Date(
        currentStart.getTime() + interval * 24 * 60 * 60 * 1000
    );

    while (currentStart < endDate) {
        intervals.push({
            startDate: currentStart,
            endDate: currentEnd > endDate ? endDate : currentEnd,
        });

        currentStart = currentEnd;
        currentEnd = new Date(
            currentStart.getTime() + interval * 24 * 60 * 60 * 1000
        );
    }

    return intervals;
};
