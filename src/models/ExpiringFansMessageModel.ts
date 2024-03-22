import mongoose, { Schema } from 'mongoose';
import { IExpiringFansMessage } from '../types';

const expiringFansMessageModel: Schema = new Schema<IExpiringFansMessage>({
    expiringFans: {
        type: Schema.Types.ObjectId,
        ref: 'ExpiringFans',
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

const ExpiringFansMessageModel = mongoose.model<
    IExpiringFansMessage,
    mongoose.Model<IExpiringFansMessage>
>('expiring_fans_message', expiringFansMessageModel);
export default ExpiringFansMessageModel;
