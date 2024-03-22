import { OFVaultItemType } from '../../constants/OFVaultItemType';

export interface OFUser {
    id: number;
    _view: string;
}

export interface OFMedia {
    id: number;
    canView: boolean;
    type: string;
    src: string;
    preview: string;
    thumb: string;
    locked: boolean | null;
    duration: number;
    hasError: boolean;
    squarePreview: string;
    hasCustomPreview: boolean;
    videoSources: any[];
    source: any[];
    info: any[];
}

export interface OFChartAmount {
    date: string;
    count: number;
}

export interface OFListState {
    id: string;
    type: OFVaultItemType;
    name: string;
    hasUser: boolean;
    canAddUser: boolean;
}

export interface OFAvatarThumbs {
    c50: string;
    c144: string;
}

export interface OFHeaderSize {
    width: number;
    height: number;
}

export interface OFHeaderThumbs {
    w480: string;
    w760: string;
}

export interface OFSubscribedData {
    price: number;
    newPrice: number;
    regularPrice: number;
    subscribePrice: number;
    discountPercent: number;
    discountPeriod: number;
    subscribeAt: string;
    expiredAt: string;
    renewedAt: string;
    discountFinishedAt: string | null;
    discountStartedAt: string | null;
    status: string | null;
    isMuted: boolean;
    unsubscribeReason: string;
    duration: string;
    showPostsInFeed: boolean;
    totalSumm: number;
    subscribes: OFSubscriptionDetail[];
    hasActivePaidSubscriptions: boolean;
}

export interface OFSubscriptionDetail {
    id: number;
    userId: number;
    subscriberId: number;
    date: string;
    duration: number;
    startDate: string;
    expireDate: string;
    cancelDate: string | null;
    price: number;
    regularPrice: number;
    discount: number;
    earningId: number;
    action: string;
    type: string;
    offerStart: string | null;
    offerEnd: string | null;
    isCurrent: boolean;
}
