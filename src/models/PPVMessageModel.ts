import mongoose, { Schema } from 'mongoose';
import IPPVMessage from '../types/IPPVMessage';

const ppvMessageModel: Schema = new Schema<IPPVMessage>({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Creator',
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
    media: {
        type: [String],
    },
});

const PPVMessageModel = mongoose.model<
    IPPVMessage,
    mongoose.Model<IPPVMessage>
>('PPVMessage', ppvMessageModel);
export default PPVMessageModel;
