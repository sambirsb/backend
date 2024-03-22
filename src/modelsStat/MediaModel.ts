import mongoose, { Schema } from 'mongoose';
import { IMedia } from '../typesStat/IMedia';
import { OFMediaType } from '../constants/OFMediaType';

const OFMediaSchema = new Schema(
    {
        id: Number,
        type: {
            type: String,
            enum: Object.values(OFMediaType),
        },
        createdAt: String,
        counters: {
            likesCount: Number,
            tipsSumm: Number,
        },
        source: {
            source: String,
            width: Number,
            height: Number,
            size: Number,
            duration: Number,
        },
        squarePreview: String,
        full: String,
        preview: String,
        thumb: String,
        hasPosts: Boolean,
        videoSources: {
            '240': String,
            '720': String,
        },
    },
    { _id: false }
);

const mediaModel = new Schema<IMedia>(
    {
        user_id: {
            type: mongoose.Schema.Types.Number,
            ref: 'public_data',
            required: true,
        },
        OF_media: OFMediaSchema,
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'media',
    }
);

const MediaModel = (connection: mongoose.Connection) => {
    return connection.model('media', mediaModel);
};

export default MediaModel;
