import mongoose, { Schema } from 'mongoose';
import { IMMM } from '../types';

const mMMModel: Schema = new Schema<IMMM>({
    massMess: {
        type: Schema.Types.ObjectId,
        ref: 'MassMessaging',
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

const MMMModel = mongoose.model<IMMM, mongoose.Model<IMMM>>(
    'MassMessagingMessage',
    mMMModel
);
export default MMMModel;
