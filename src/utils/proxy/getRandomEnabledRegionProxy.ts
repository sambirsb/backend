import { EnabledRegionProxy } from '../../generated/graphql';
import { generateRandomInt } from '../math/generateRandomInt';

export const getRandomEnabledRegionProxy = (): EnabledRegionProxy => {
    const countries = Object.values(EnabledRegionProxy);
    const randomIndex = generateRandomInt(countries.length);

    return countries[randomIndex] as EnabledRegionProxy;
};
