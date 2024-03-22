import mongoose, { Schema } from 'mongoose';
import { IPromotionReactivator } from '../types';

const promotionReactivatorModel: Schema = new Schema<IPromotionReactivator>({
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
    period: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max: 30,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const PromotionReactivatorModel = mongoose.model<
    IPromotionReactivator,
    mongoose.Model<IPromotionReactivator>
>('PromotionReactivator', promotionReactivatorModel);
export default PromotionReactivatorModel;
