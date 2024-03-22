import axios from 'axios';
import { ENDPOINTS_BD, FILTERS_BD } from '../../constants/apiEndpointsBD';
import { elevateError } from '../../errors/elevateError';

export const getZoneInfo = async (zone: string) => {
    try {
        const API_TOKEN = process.env.BRIGHT_DATA_API_TOKEN as string;
        const zoneInfo = await axios.get(
            `${ENDPOINTS_BD.zone}/${FILTERS_BD.zone}${zone}`,
            {
                headers: { Authorization: `Bearer ${API_TOKEN}` },
            }
        );

        return zoneInfo.data;
    } catch (error) {
        elevateError(error);
    }
};
