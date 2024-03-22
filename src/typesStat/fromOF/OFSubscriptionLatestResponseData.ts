import {
    OFAvatarThumbs,
    OFHeaderSize,
    OFHeaderThumbs,
    OFListState,
    OFSubscribedData,
} from './OFLibTypes';

export interface OFSubscriptionLatestResponseData {
    users: OFSubUser[];
    hasMore: boolean;
}

export interface OFSubUser {
    view: string;
    avatar: string | null;
    avatarThumbs: OFAvatarThumbs;
    header: string | null;
    headerSize: OFHeaderSize;
    headerThumbs: OFHeaderThumbs;
    id: number;
    name: string;
    username: string;
    canLookStory: boolean;
    canCommentStory: boolean;
    hasNotViewedStory: boolean;
    isVerified: boolean;
    canPayInternal: boolean;
    hasScheduledStream: boolean;
    hasStream: boolean;
    hasStories: boolean;
    tipsEnabled: boolean;
    tipsTextEnabled: boolean;
    tipsMin: number;
    tipsMinInternal: number;
    tipsMax: number;
    canEarn: boolean;
    canAddSubscriber: boolean;
    subscribePrice: number;
    displayName: string;
    notice: string;
    unprofitable: boolean;
    listsStates: OFListState[];
    isRestricted: boolean;
    canRestrict: boolean;
    subscribedBy: boolean;
    subscribedByExpire: boolean;
    subscribedByExpireDate: string;
    subscribedByAutoprolong: boolean;
    subscribedIsExpiredNow: boolean;
    currentSubscribePrice: number;
    subscribedOn: boolean;
    subscribedOnExpiredNow: boolean;
    subscribedOnDuration: string;
    canReport: boolean;
    canReceiveChatMessage: boolean;
    hideChat: boolean;
    lastSeen: string;
    isPerformer: boolean;
    isRealPerformer: boolean;
    subscribedByData: OFSubscribedData;
    subscribedOnData: OFSubscribedData;
    canTrialSend: boolean;
    isBlocked: boolean;
}
