import axios from 'axios';
import { config } from '../../constants/config/env';
import { ENDPOINTS_BD } from '../../constants/apiEndpointsBD';
import { ActiveZone } from '../../types';

export const getActiveZones = async (): Promise<ActiveZone[]> => {
    try {
        const zone = await axios.get(`${ENDPOINTS_BD.activeZones}`, {
            headers: {
                Authorization: `Bearer ${config.BRIGHT_DATA_PROXY.apiToken}`,
            },
        });

        return zone.data;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
