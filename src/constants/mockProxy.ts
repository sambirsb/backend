import { ZoneData } from '../types/brightData/ZoneData';
import { ISPInput } from '../types/brightData/ISPInput';

export const mockZoneData: ZoneData = {
    name: 'zone_name_1',
    plan: {
        type: 'static',
        ips_type: 'dedicated',
        bandwidth: 'payperusage',
        ip_alloc_preset: 'shared_block',
        ips: 1,
        //country: 'US',
        //country_city: 'US',
        mobile: false,
        serp: false,
        city: false,
        asn: false,
        vip: true,
        vips_type: 'domain',
        vips: 1,
        domain_whitelist: 'test.com',
        vip_country: 'US',
        vip_country_city: 'US',
    },
};

export const mockZoneDataCustom: ZoneData = {
    name: 'zone_12',
    plan: {
        type: 'static',
        ips_type: 'dedicated',
        bandwidth: 'unlimited',
        ips: 1,
        country: 'ca',
        mobile: false,
        serp: false,
        city: false,
        asn: false,
        vip: false,
    },
};

export const mockISPInput: ISPInput = {
    customer: 'hl_c266ee52',
    zone: 'zone_name',
    count: 1,
    country: 'US',
    country_city: 'US',
};

//brd-customer-hl_c266ee52-zone-zone_name_1

//brd-customer-hl_c266ee52-zone-isp
