import { IVaultItem } from './IVaultItem';

export interface VaultCustomData {
    id: number;
    name: string;
    videosCount: number;
    photosCount: number;
    mediaIds: number[];
}

export interface PPVData {
    media: MediaData[];
}

interface MediaData {
    id: number;
}

export interface PopulatedVaultItem extends Omit<IVaultItem, 'medias'> {
    medias: { OF_media: { id: number } }[];
}
