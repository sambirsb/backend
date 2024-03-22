import { Model, model, Schema } from 'mongoose';
import { IMassMessaging } from '../types';

const massMessagingModel: Schema = new Schema<IMassMessaging>({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Creator',
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    startDate: Date,
    endDate: Date,
    excludeFans: {
        type: Number,
        default: 0,
    },
    activeSub: {
        type: Boolean,
        default: false,
    },
    neverChatBefore: {
        type: Boolean,
        default: false,
    },
    sentTo: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const MassMessagingModel = model<IMassMessaging, Model<IMassMessaging>>(
    'MassMessaging',
    massMessagingModel
);
export default MassMessagingModel;
