import axios from 'axios';
import { config } from '../../constants/config/env';
import { ENDPOINTS_BD } from '../../constants/apiEndpointsBD';
import { AddedZone, ZoneData } from '../../types';

export const addProxyZone = async (zoneData: ZoneData): Promise<AddedZone> => {
    try {
        const API_TOKEN = config.BRIGHT_DATA_PROXY.apiToken as string;
        const response = await axios.post(
            `${ENDPOINTS_BD.zone}`,
            { zone: { name: zoneData.name }, plan: zoneData.plan },
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating proxy zone:', error);
        throw error;
    }
};
