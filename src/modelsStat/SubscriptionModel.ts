import { Connection, Schema } from 'mongoose';
import { ISubscription, OFSubUser, OFSubscriptionDetail } from '../typesStat';

const OFAvatarThumbsSchema = new Schema(
    {
        c50: String,
        c144: String,
    },
    { _id: false }
);

const OFHeaderSizeSchema = new Schema(
    {
        width: Number,
        height: Number,
    },
    { _id: false }
);

const OFHeaderThumbsSchema = new Schema(
    {
        w480: String,
        w760: String,
    },
    { _id: false }
);

const OFListStateSchema = new Schema(
    {
        id: String,
        type: String,
        name: String,
        hasUser: Boolean,
        canAddUser: Boolean,
    },
    { _id: false }
);

const OFSubscribes = new Schema<OFSubscriptionDetail>(
    {
        id: Number,
        userId: Number,
        subscriberId: Number,
        date: Date,
        duration: Number,
        startDate: String,
        expireDate: String,
        cancelDate: String,
        price: Number,
        regularPrice: Number,
        discount: Number,
        earningId: Number,
        action: String,
        type: String,
        offerStart: String,
        offerEnd: String,
        isCurrent: Boolean,
    },
    { _id: false }
);

const OFSubscribedDataSchema = new Schema(
    {
        price: Number,
        newPrice: Number,
        regularPrice: Number,
        subscribePrice: Number,
        discountPercent: Number,
        discountPeriod: Number,
        subscribeAt: String,
        expiredAt: String,
        renewedAt: String,
        discountFinishedAt: String,
        discountStartedAt: String,
        status: String,
        isMuted: Boolean,
        unsubscribeReason: String,
        duration: String,
        showPostsInFeed: Boolean,
        totalSumm: Number,
        subscribes: [OFSubscribes],
        hasActivePaidSubscriptions: Boolean,
    },
    { _id: false }
);

const OFSubUserSchema = new Schema<OFSubUser>(
    {
        view: String,
        avatar: String,
        avatarThumbs: OFAvatarThumbsSchema,
        header: String,
        headerSize: OFHeaderSizeSchema,
        headerThumbs: OFHeaderThumbsSchema,
        id: Number,
        name: String,
        username: String,
        canLookStory: Boolean,
        canCommentStory: Boolean,
        hasNotViewedStory: Boolean,
        isVerified: Boolean,
        canPayInternal: Boolean,
        hasScheduledStream: Boolean,
        hasStream: Boolean,
        hasStories: Boolean,
        tipsEnabled: Boolean,
        tipsTextEnabled: Boolean,
        tipsMin: Number,
        tipsMinInternal: Number,
        tipsMax: Number,
        canEarn: Boolean,
        canAddSubscriber: Boolean,
        subscribePrice: Number,
        displayName: String,
        notice: String,
        unprofitable: Boolean,
        listsStates: [OFListStateSchema],
        isRestricted: Boolean,
        canRestrict: Boolean,
        subscribedBy: Boolean,
        subscribedByExpire: Boolean,
        subscribedByExpireDate: String,
        subscribedByAutoprolong: Boolean,
        subscribedIsExpiredNow: Boolean,
        currentSubscribePrice: Number,
        subscribedOn: Boolean,
        subscribedOnExpiredNow: Boolean,
        subscribedOnDuration: String,
        canReport: Boolean,
        canReceiveChatMessage: Boolean,
        hideChat: Boolean,
        lastSeen: String,
        isPerformer: Boolean,
        isRealPerformer: Boolean,
        subscribedByData: OFSubscribedDataSchema,
        subscribedOnData: OFSubscribedDataSchema,
        canTrialSend: Boolean,
        isBlocked: Boolean,
    },
    { _id: false }
);

const subscriptionModelSchema = new Schema<ISubscription>(
    {
        _id: {
            type: Number,
            required: true,
        },
        user_id: {
            type: Schema.Types.Number,
            ref: 'PublicData',
            required: true,
        },
        friend_user_id: {
            type: Schema.Types.Number,
            ref: 'PublicData',
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        OF_subUser: OFSubUserSchema,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

subscriptionModelSchema.virtual('userData', {
    ref: 'PublicData',
    localField: 'user_id',
    foreignField: '_id',
    justOne: true,
});

subscriptionModelSchema.virtual('friendUserData', {
    ref: 'PublicData',
    localField: 'friend_user_id',
    foreignField: '_id',
    justOne: true,
});

const SubscriptionModel = (connection: Connection) => {
    return connection.model('subscriptions', subscriptionModelSchema);
};

export default SubscriptionModel;
