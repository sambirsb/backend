import { OFVaultItemType } from '../../constants/OFVaultItemType';
import { OFMediaType } from '../../constants/OFMediaType';

export interface OFVaultListResponse {
    list: OFVaultItem[];
    all: {
        videosCount: number;
        photosCount: number;
        gifsCount: number;
        audiosCount: number;
        medias: OFVaultMedia[];
    };
    hasMore: boolean;
}

export interface OFVaultMedia {
    type: OFMediaType;
    url: string;
}

export interface OFVaultItem {
    id: number;
    type: OFVaultItemType;
    name: string;
    hasMedia: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    videosCount: number;
    photosCount: number;
    gifsCount: number;
    audiosCount: number;
    medias: OFVaultMedia[];
}
