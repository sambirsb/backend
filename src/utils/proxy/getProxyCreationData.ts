import { config } from '../../constants/config/env';
import { ProxyType } from '../../constants/proxyType';
import { AddedZone } from '../../types';

export const getProxyCreationData = (
    countryCode: string,
    nextActiveZoneNumber: number,
    zoneName: string,
    addedZone: AddedZone
) => {
    const host = config.BRIGHT_DATA_PROXY.host;
    const port = config.BRIGHT_DATA_PROXY.port;
    const userName = `${config.BRIGHT_DATA_PROXY.userNameStart}-zone-${zoneName}`;

    return {
        zone: {
            country: countryCode,
            number: nextActiveZoneNumber,
        },
        host,
        port,
        userName,
        password: addedZone.zone.password[0],
        proxyType: ProxyType.AUTO,
        creatorId: null,
    };
};
