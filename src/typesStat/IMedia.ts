import { Document, Types } from 'mongoose';
import { OFMediaType } from '../constants/OFMediaType';
import {
    OFMediaCounters,
    OFMediaSource,
    OFVideoSources,
} from './fromOF/OFVaultCustomMediaResponseData';

export interface IMedia extends Document {
    _id: Types.ObjectId;
    user_id: number;
    OF_media: OFVaultMedia;
}

interface OFVaultMedia {
    id: number;
    type: OFMediaType;
    createdAt: string;
    counters: OFMediaCounters;
    source: OFMediaSource;
    squarePreview: string;
    full: string;
    preview: string;
    thumb: string;
    hasPosts: boolean;
    videoSources: OFVideoSources;
}
