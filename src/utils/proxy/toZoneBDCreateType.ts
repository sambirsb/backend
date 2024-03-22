import { ZoneData } from '../../types';

export const toZoneBDCreateType = (
    zoneName: string,
    countryCode: string
): ZoneData => {
    return {
        name: zoneName,
        plan: {
            type: 'static',
            ips_type: 'dedicated',
            bandwidth: 'unlimited',
            ips: 1,
            country: countryCode,
            mobile: false,
            serp: false,
            city: false,
            asn: false,
            vip: false,
        },
    };
};
