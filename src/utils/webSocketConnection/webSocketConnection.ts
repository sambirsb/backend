import dotenv from 'dotenv';
import schedule from 'node-schedule';
import {
    createWebSocketDirectly,
    createWebSocketWithProxy,
    fetchCreatorTokens,
    launchAfterOpenConnection,
} from '../';
import { getProxyConfigByOFUserId } from '../../scraperUtils';
import { ProxyConfig } from '../../typesStat';

dotenv.config();
let curSocket: any;

const connectToWebSocket = async (url: string, creator: any) => {
    let proxy: ProxyConfig, socket: any;

    try {
        proxy = await getProxyConfigByOFUserId(creator.creatorAuth.user_id);
        socket = proxy
            ? createWebSocketWithProxy(url, proxy)
            : createWebSocketDirectly(url);
    } catch (error) {
        console.log(
            'Using direct connection due to error getting proxy:',
            error
        );
        return;
    }

    return new Promise((resolve, reject) => {
        socket.on('open', async () => {
            console.log('WebSocket connection established');

            await launchAfterOpenConnection(
                resolve,
                reject,
                creator,
                socket,
                curSocket,
                proxy
            );
        });

        socket.on('error', (error: { message: any }) => {
            console.log('Proxy connection failed:', error.message);
            socket = createWebSocketDirectly(url);
            socket.on('open', () => {
                console.log('Connected directly');
                launchAfterOpenConnection(
                    resolve,
                    reject,
                    creator,
                    socket,
                    curSocket,
                    proxy
                );
            });
            socket.on('error', (error: any) => {
                reject(error);
            });
        });

        socket.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });
};

const updateCreatorsAndConnect = async () => {
    const creatorTokens = await fetchCreatorTokens();

    creatorTokens.forEach((creator) => {
        connectToWebSocket(process.env.ONLYFANS_WS as string, creator)
            .then(() => {
                console.log('Connected for creator:', creator._id);
            })
            .catch((error) => {
                console.error(
                    'Error in WebSocket connection for creator:',
                    creator._id,
                    error
                );
            });
    });
};

export const webSocketConnection = async () => {
    schedule.scheduleJob('*/10 * * * *', () => {
        updateCreatorsAndConnect();
    });
};
