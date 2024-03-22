import { ProxyCountry } from '../../constants/ProxyCountry';

export const getCountryCode = (country: string) => {
    const upperCountry = country.toUpperCase();
    const code = Object.keys(ProxyCountry).includes(upperCountry)
        ? ProxyCountry[upperCountry as keyof typeof ProxyCountry]
        : undefined;

    if (!code) {
        throw new Error(`Unknown country: ${country}`);
    }

    return code;
};
