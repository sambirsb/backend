import { Connection, QueryOptions } from 'mongoose';
import MediaModel from '../modelsStat/MediaModel';
import { OFVaultMediaItem } from '../typesStat/fromOF/OFVaultCustomMediaResponseData';
import { IMedia } from '../typesStat/IMedia';
import { OFMediaType } from '../constants/OFMediaType';

class MediaService {
    async updateMedia(
        data: OFVaultMediaItem[],
        user_id: string,
        statConnection: Connection
    ) {
        const updatedMediaList: IMedia[] = [];
        try {
            const MediaModelObj = MediaModel(statConnection);

            for (let i = 0; i < data.length; i++) {
                const media = {
                    user_id: Number(user_id),
                    OF_media: {
                        id: data[i].id as number,
                        type: data[i].type as OFMediaType,
                        createdAt: data[i].createdAt,
                        counters: data[i].counters,
                        source: data[i].source,
                        squarePreview: data[i].squarePreview,
                        full: data[i].full,
                        preview: data[i].preview,
                        thumb: data[i].thumb,
                        hasPosts: data[i].hasPosts,
                        videoSources: data[i].videoSources,
                    },
                } as IMedia;

                const updatedMedia = (await MediaModelObj.findOneAndUpdate(
                    {
                        user_id: media.user_id,
                        'OF_media.id': media.OF_media.id,
                    },
                    media,
                    {
                        new: true,
                        upsert: true,
                    } as QueryOptions
                )) as IMedia;

                if (!updatedMedia) {
                    await MediaModelObj.create(media);
                }

                updatedMediaList.push(updatedMedia);
            }

            return updatedMediaList;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

const mediaService = new MediaService();
export default mediaService;
