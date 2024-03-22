import { Connection, Model, Schema } from 'mongoose';
import { IMessage } from '../typesStat';

const OFMessageSchema = new Schema({
    text: String,
    giphyId: String,
    lockedText: Boolean,
    isFree: Boolean,
    price: Number,
    isMediaReady: Boolean,
    mediaCount: Number,
    media: [
        {
            type: Number,
        },
    ],
    isTip: Boolean,
    isReportedByMe: Boolean,
    isCouplePeopleMedia: Boolean,
    queueId: Number,
    fromUser: {
        type: Schema.Types.Number,
        ref: 'public_data',
        required: true,
    },
    isFromQueue: Boolean,
    isOpened: Boolean,
    isNewOM: Boolean,
    createdAt: Date,
    changedAt: Date,
    cancelSeconds: Number,
    isLiked: Boolean,
    canPurchase: Boolean,
    canPurchaseReason: String,
    canReport: Boolean,
    canBePinned: Boolean,
    isPinned: Boolean,
    tipAmount: Number,
    tipText: String,
    isFundRaisingTip: Boolean,
    releaseForms: [
        {
            type: String,
        },
    ],
    canUnsendQueue: Boolean,
    unsendSecondsQueue: Number,
});

const MessageSchema = new Schema<IMessage>(
    {
        _id: {
            type: Number,
            required: true,
        },
        user_id: { type: Number, required: true },
        OF_message: { type: OFMessageSchema, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'messages',
    }
);

const MessageModel = (connection: Connection) => {
    return connection.model<IMessage, Model<IMessage>>(
        'messages',
        MessageSchema
    );
};

export default MessageModel;
