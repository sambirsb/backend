import { getActiveZones } from '../brightDataApi/getActiveZones';

export const getMaxActiveZoneNumberFromBD = async (
    countryCode: string
): Promise<number> => {
    try {
        const activeZones = await getActiveZones();

        return activeZones
            .filter((zone) => zone.name.startsWith(countryCode + '_'))
            .reduce((max, zone) => {
                const zoneNumber = parseInt(zone.name.split('_')[1], 10);
                return zoneNumber > max ? zoneNumber : max;
            }, 0);
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
