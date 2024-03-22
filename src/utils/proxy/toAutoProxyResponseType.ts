import { getCountryName } from './getCountryName';
import { IProxy } from '../../types';

export const toAutoProxyResponseType = (proxy: IProxy) => {
    if (!proxy) {
        return null;
    }

    let country = '';
    let number = '';

    if (proxy.zone && proxy.zone?.country) {
        country = getCountryName(proxy.zone.country);
        number = proxy.zone?.number || '';
    }

    return {
        id: proxy.id,
        creatorId: proxy.creatorId,
        host: proxy.host,
        port: proxy.port,
        userName: proxy.userName,
        password: proxy.password,
        proxyType: proxy.proxyType,
        zone: {
            country,
            number,
        },
    };
};
