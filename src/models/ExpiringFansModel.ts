import mongoose, { Schema } from 'mongoose';
import { IExpiringFans } from '../types';

const expiringFansModel: Schema = new Schema<IExpiringFans>({
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
    messageTiming: {
        type: Number,
        required: true,
        default: 15,
        min: 0,
        max: 1000000,
    },
    spendingLimitation: {
        type: Boolean,
        required: true,
        default: false,
    },
    spendingLimitationSum: {
        type: Number,
        required: true,
        default: 5,
        min: 0,
        max: 1000000,
    },
    timeLimitation: {
        type: Number,
        required: true,
        default: 15,
        min: 0,
        max: 1000000,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const ExpiringFansModel = mongoose.model<
    IExpiringFans,
    mongoose.Model<IExpiringFans>
>('expiring_fans', expiringFansModel);
export default ExpiringFansModel;
