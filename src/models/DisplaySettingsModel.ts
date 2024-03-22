import mongoose, { Schema } from 'mongoose';
import { IDisplaySettings } from '../types';
import { Emojis } from '../constants/emoji';

const displaySettingsModel: Schema = new Schema<IDisplaySettings>({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Creator',
        required: true,
    },
    audioId: {
        type: Number,
        required: true,
        default: 1,
    },
    audioVolume: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 50,
    },
    emojis: {
        type: String,
        default: Emojis.DEFAULT,
    },
    emojiStatus: {
        type: Boolean,
        required: true,
        default: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const DisplaySettingsModel = mongoose.model<
    IDisplaySettings,
    mongoose.Model<IDisplaySettings>
>('display_settings', displaySettingsModel);
export default DisplaySettingsModel;
