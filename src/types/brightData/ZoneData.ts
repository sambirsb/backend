export interface ZoneData {
    name: string;
    plan: {
        type: 'static' | 'resident' | 'unblocker'; // 'static' : Datacenter, ISP 'resident' : Residential, Mobile, SERP 'unblocker' : unlocker
        ips_type?: 'shared' | 'dedicated' | 'selective'; // specify this parameter when adding a Datacenter or ISP zone 'shared' : Shared 'dedicated' : Exclusive - All domain 'selective' : Exclusvie - Exclusive domain specified (domain_whitelist is required)
        bandwidth?: 'payperusage' | 'unlimited'; // 'unlimited' : enable unlimited bandwidth, this setting will be applied only to Datacenter - Shared per IP or Exclusive types.
        ip_alloc_preset?: 'shared_block' | 'shared_res_block'; // to set a zone with Shared - Pay per usage type.
        ips?: number; // number of static IPs to allocate to the zone
        country?: string; // specify which country IP to allocate to the zone, specify this parameter when 'ips_type=static'
        country_city?: string; // country code followed by city (e.g. "se-stockholm") - specify which City IP to allocate to the zone, specify this parameter when 'ips_type=static'
        mobile?: boolean; //'true' when adding a Mobile proxy zone, type value must be 'resident'
        serp?: boolean; // 'true' when adding a SERP API zone
        city?: boolean; // 'true' when enabling City targeting permission
        asn?: boolean; // 'true' when enabling ASN targeting permission
        vip?: boolean; // 'true' when allocating gIP (group of IPs)
        vips_type?: 'shared' | 'domain'; // specify this parameter when adding a Residential or Mobile zone 'shared' : Shared 'domain' : Exclusive (domain_whitelist is required)
        vips?: number; // number of gIP (group of IPs) to allocate to the zone
        domain_whitelist?: string; //Space separated list of whitelisted domains
        vip_country?: string; // specify which country IP to allocate to the zone, specify this parameter when 'ips_type=resident' and 'vip=true'
        vip_country_city?: string; // country code followed by city (e.g. "se-stockholm") - specify which City IP to allocate to the zone, specify this parameter when 'ips_type=resident' and 'vip=true'
    };
}

interface ZonePlan {
    start: string;
    type: string;
    country: string;
    bandwidth: string;
    product: string;
}

interface AllocationOptions {
    alloc_max_available: boolean;
    no_reserve: boolean;
    user: string;
    req_source: string;
}

interface Zone {
    password: string[];
    ips: string;
    plan: ZonePlan;
}

export interface AddedZone {
    zone: Zone;
    plan: ZonePlan;
    alloc_opt: AllocationOptions;
}

export interface ActiveZone {
    name: string;
    type: string;
}
