import { HEART_BEAT_INTERVAL } from '../../constants/delay';
import { getWSTokenData, getWSTokenDataWithoutProxy } from '../../scraperUtils';
import { sendWelcomeMessage, saveToNewSubsList, sendPPVFollowUps } from '../';
import { ProxyConfig } from '../../typesStat';

export const launchAfterOpenConnection = async (
    resolve: (arg0: any) => void,
    reject: (arg0: unknown) => void,
    creator: any,
    socket: any,
    curSocket: any,
    proxy: ProxyConfig
) => {
    async function sendHeartbeat() {
        console.log('Sending Heartbeat...');
        curSocket.send(JSON.stringify({ act: 'get_onlines', ids: [] }));

        setTimeout(sendHeartbeat, HEART_BEAT_INTERVAL);
    }
    try {
        console.log('Sending connect message');
        let wsToken;

        if (proxy) {
            wsToken = await getWSTokenData(creator.creatorAuth);
        } else {
            wsToken = await getWSTokenDataWithoutProxy(creator.creatorAuth);
        }

        await socket.send(JSON.stringify({ act: 'connect', token: wsToken }));

        await socket.on('message', async function incoming(data: any) {
            const msg = JSON.parse(data);

            console.log(msg);

            if (
                creator.welcomeData.welcomeSettings.active &&
                msg?.new_message?.type == 'subscribed' &&
                proxy
            ) {
                await sendWelcomeMessage(msg?.new_message, creator);
            }

            if (
                creator.collectionListId &&
                msg?.new_message?.type === 'subscribed'
            ) {
                await saveToNewSubsList(msg?.new_message, creator, proxy);
            }

            if (
                creator.ppvInfo.ppvSettings.active &&
                msg?.api2_chat_message?.isFree == false &&
                msg?.api2_chat_message?.isOpened == false &&
                msg?.api2_chat_message.canPurchaseReason !== 'not_available'
            ) {
                await sendPPVFollowUps(msg?.api2_chat_message, creator);
            }

            if (msg.connected === true) {
                console.log('Connected!');
                curSocket = socket;
                setTimeout(sendHeartbeat, HEART_BEAT_INTERVAL);
                resolve(socket);
            }
        });
    } catch (error) {
        reject(error);
    }
};
