import mongoose, { Schema } from 'mongoose';
import { IWelcomeSettings } from '../types';

const welcomeSettingsModel: Schema = new Schema<IWelcomeSettings>({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    time: {
        type: Number,
        required: true,
        default: 15,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const WelcomeSettingsModel = mongoose.model<
    IWelcomeSettings,
    mongoose.Model<IWelcomeSettings>
>('WelcomeSettingsModel', welcomeSettingsModel);
export default WelcomeSettingsModel;
