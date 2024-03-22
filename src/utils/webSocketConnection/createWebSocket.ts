import { HttpsProxyAgent } from 'https-proxy-agent';
import { URL } from 'url';
import WebSocket from 'ws';
import { ProxyConfig } from '../../typesStat';

export function createWebSocketWithProxy(
    url: string | URL,
    proxy: ProxyConfig
) {
    const proxyUrl = `https://${proxy.auth.username}:${proxy.auth.password}@${proxy.host}:${proxy.port}`;
    const proxyAgent = new HttpsProxyAgent(proxyUrl);
    return new WebSocket(url, { agent: proxyAgent });
}

export function createWebSocketDirectly(url: string) {
    return new WebSocket(url);
}
