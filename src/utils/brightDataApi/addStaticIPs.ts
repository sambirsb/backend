import axios from 'axios';
import { ENDPOINTS_BD } from '../../constants/apiEndpointsBD';
import { ISPInput } from '../../types/brightData/ISPInput';

export const addStaticIPs = async (params: ISPInput) => {
    try {
        const API_TOKEN = process.env.BRIGHT_DATA_API_TOKEN as string;
        const response = await axios.post(
            `${ENDPOINTS_BD.ips}`,
            {
                customer: params.customer,
                zone: params.zone,
                count: params.count,
                country: params.country,
                country_city: params.country_city,
            },
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding static IPs:', error);
        throw error;
    }
};
