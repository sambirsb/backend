import { OFMedia, OFUser } from './OFLibTypes';

export interface OFMessagesResponseData {
    list: OFMessage[];
    hasMore: boolean;
}
export interface OFMessage {
    responseType: 'message';
    text: string;
    giphyId: string | null;
    lockedText: boolean;
    isFree: boolean;
    price: number;
    isMediaReady: boolean;
    mediaCount: number;
    media: OFMedia[];
    previews: any[];
    isTip: boolean;
    isReportedByMe: boolean;
    isCouplePeopleMedia: boolean;
    queueId: number;
    fromUser: OFUser;
    isFromQueue: boolean;
    id: number;
    isOpened: boolean;
    isNew: boolean;
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
