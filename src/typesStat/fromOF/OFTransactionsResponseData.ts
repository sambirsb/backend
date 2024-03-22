import { OFAvatarThumbs } from './OFLibTypes';

export interface OFTransactionsResponseData {
    list: OFTransaction[];
    marker: number;
    hasMore: boolean;
    nextMarker: number | null;
}

export interface OFTransaction {
    amount: number;
    vatAmount: number;
    net: number;
    fee: number;
    createdAt: string;
    currency: string;
    description: string;
    status: string;
    user: TransactionUser;
    id: string;
}

export interface TransactionUser {
    view: string;
    id: number;
    name: string;
    username: string;
    isVerified: boolean;
    avatar: string | null;
    avatarThumbs: OFAvatarThumbs;
}
