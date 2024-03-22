import { OFListState } from './OFLibTypes';
import { OFMediaType } from '../../constants/OFMediaType';

export interface OFVaultCustomMediaResponse {
    list: OFVaultMediaItem[];
    hasMore: boolean;
}

export interface OFVaultMediaItem {
    id: number;
    type: OFMediaType;
    convertedToVideo: boolean;
    canView: boolean;
    hasError: boolean;
    createdAt: string;
    isReady: boolean;
    counters: OFMediaCounters;
    info: MediaInfo;
    source: OFMediaSource;
    squarePreview: string;
    full: string;
    preview: string;
    thumb: string;
    hasPosts: boolean;
    listStates: OFListState[];
    releaseForms: any[];
    hasCustomPreview: boolean;
    files: MediaFiles;
    videoSources: OFVideoSources;
}

export interface OFMediaCounters {
    likesCount: number;
    tipsSumm: number;
}

interface MediaInfo {
    source: OFMediaSource;
    preview: MediaSourceMini;
}

export interface OFMediaSource {
    source: string;
    width: number;
    height: number;
    size: number;
    duration: number;
}

interface MediaSourceMini {
    width: number;
    height: number;
    size: number;
}

interface MediaFiles {
    preview: {
        url: string;
    };
}

export interface OFVideoSources {
    '240': string | null;
    '720': string | null;
}
