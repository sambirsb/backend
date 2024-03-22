import mongoose, { Schema } from 'mongoose';
import { IFanNumbering } from '../types';

const fanNumberingModel: Schema = new Schema<IFanNumbering>({
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
    numbers: {
        type: Number,
        required: true,
        default: 2,
        min: 2,
        max: 9,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const FanNumberingModel = mongoose.model<
    IFanNumbering,
    mongoose.Model<IFanNumbering>
>('FanNumbering', fanNumberingModel);
export default FanNumberingModel;
