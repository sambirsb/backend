import { SubsWithExpired } from '../../typesStat/SubsTypes';

export const mergeManySubsWithExpired = (
    subs: SubsWithExpired[]
): SubsWithExpired => {
    const merged: SubsWithExpired = {
        actual: [],
        expired: [],
    };

    subs.forEach((subsWithExpired) => {
        merged.actual = merged.actual.concat(subsWithExpired.actual);
        merged.expired = merged.expired.concat(subsWithExpired.expired);
    });

    return merged;
};
