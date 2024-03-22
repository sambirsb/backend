import mongoose, { Schema } from 'mongoose';
import { IWelcomeMessage } from '../types';

const welcomeMessageModel: Schema = new Schema<IWelcomeMessage>({
    welcomeSettings: {
        type: Schema.Types.ObjectId,
        ref: 'WelcomeSettings',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    fallbackName: {
        type: String,
        required: true,
    },
    media: [String],
});

const WelcomeMessageModel = mongoose.model<
    IWelcomeMessage,
    mongoose.Model<IWelcomeMessage>
>('WelcomeMessage', welcomeMessageModel);
export default WelcomeMessageModel;
