import { OFUser, OFMedia } from './OFLibTypes';

export interface OFChattersResponseData {
    list: ChatUser[];
    hasMore: boolean;
    nextOffset: number;
}

export interface ChatUser {
    withUser: OFUser;
    canNotSendReason: boolean;
    canSendMessage: boolean;
    canGoToProfile: boolean;
    unreadMessagesCount: number;
    hasUnreadTips: boolean;
    isMutedNotifications: boolean;
    lastMessage: LastMessage;
    lastReadMessageId: number;
    hasPurchasedFeed: boolean;
    countPinnedMessages: number;
}

interface LastMessage {
    responseType: string;
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
    releaseForms: any[];
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
}
