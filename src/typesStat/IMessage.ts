import { Document } from 'mongoose';

export interface IMessage extends Document {
    _id: number;
    user_id: number;
    OF_message: OF_Message;
}

export interface OF_Message {
    text: string;
    giphyId: string | null;
    lockedText: boolean;
    isFree: boolean;
    price: number;
    isMediaReady: boolean;
    mediaCount: number;
    media: number[];
    isTip: boolean;
    isReportedByMe: boolean;
    isCouplePeopleMedia: boolean;
    queueId: number;
    fromUser: number;
    isFromQueue: boolean;
    isOpened: boolean;
    isNewOM: boolean;
    createdAt: string;
    changedAt: string;
    cancelSeconds: number;
    isLiked: boolean;
    canPurchase: boolean;
    canPurchaseReason: string;
    canReport: boolean;
    canBePinned: boolean;
    isPinned: boolean;
    tipAmount?: number;
    tipText?: string;
    isFundRaisingTip?: boolean;
    releaseForms?: any[];
    canUnsendQueue?: boolean;
    unsendSecondsQueue?: number;
}
