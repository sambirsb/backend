import { ProxyCountry } from '../../constants/ProxyCountry';

export const getCountryName = (code: string) => {
    const entries = Object.entries(ProxyCountry);
    const entry = entries.find(([, value]) => value === code);

    if (!entry) {
        throw new Error(`Country with code "${code}" not found.`);
    }

    const countryName = entry[0];

    if (countryName === 'USA') {
        return 'USA';
    }

    return countryName.charAt(0) + countryName.slice(1).toLowerCase();
};
