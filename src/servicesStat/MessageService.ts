import mongoose from 'mongoose';
import MessageModel from '../modelsStat/MessageModel';
import { OFMessagesResponseData } from '../typesStat/fromOF/OFMessagesResponseData';
import { IMessage } from '../typesStat/IMessage';

class MessageService {
    async getChatsMessages(
        user_id: string,
        statConnection: mongoose.Connection
    ) {
        try {
            const MessageModelObj = MessageModel(statConnection);

            return await MessageModelObj.find({ user_id: Number(user_id) });
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async updateMessages(
        data: OFMessagesResponseData,
        user_id: string,
        statConnection: mongoose.Connection
    ) {
        try {
            const MessageModelObj = MessageModel(statConnection);

            const mesList = data.list;

            for (let i = 0; i < mesList.length; i++) {
                const m = mesList[i];
                const messages = {
                    _id: Number(m.id),
                    user_id: Number(user_id),
                    OF_message: {
                        text: m.text,
                        giphyId: m.giphyId,
                        lockedText: m.lockedText,
                        isFree: m.isFree,
                        price: m.price,
                        isMediaReady: m.isMediaReady,
                        mediaCount: m.mediaCount,
                        media: m.media.map((media) => media.id),
                        isTip: m.isTip,
                        isReportedByMe: m.isReportedByMe,
                        isCouplePeopleMedia: m.isCouplePeopleMedia,
                        queueId: m.queueId,
                        fromUser: Number(m.fromUser.id),
                        isFromQueue: m.isFromQueue,
                        isOpened: m.isOpened,
                        isNewOM: m.isNew,
                        createdAt: m.createdAt,
                        changedAt: m.changedAt,
                        cancelSeconds: m.cancelSeconds,
                        isLiked: m.isLiked,
                        canPurchase: m.canPurchase,
                        canPurchaseReason: m.canPurchaseReason,
                        canReport: m.canReport,
                        canBePinned: m.canBePinned,
                        isPinned: m.isPinned,
                        tipAmount: m.tipAmount,
                        tipText: m.tipText,
                        isFundRaisingTip: m.isFundRaisingTip,
                        releaseForms: m.releaseForms,
                        canUnsendQueue: m.canUnsendQueue,
                        unsendSecondsQueue: m.unsendSecondsQueue,
                    },
                } as IMessage;

                const updatedMessages = await MessageModelObj.findOneAndUpdate(
                    { _id: Number(m.id) },
                    messages,
                    {
                        new: true,
                        upsert: true,
                    }
                );

                if (!updatedMessages) {
                    await MessageModelObj.create(messages);
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const messageService = new MessageService();
export default messageService;
