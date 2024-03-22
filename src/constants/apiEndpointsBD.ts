export const API_BASE_BD: string = 'https://api.brightdata.com';

export const ENDPOINTS_BD = {
    activeZones: `${API_BASE_BD}/zone/get_active_zones`,
    zone: `${API_BASE_BD}/zone`,
    ips: `${API_BASE_BD}/zone/ips`,
};

export const FILTERS_BD = {
    zone: '?zone=',
};
