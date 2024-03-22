import mongoose, { Schema } from 'mongoose';
import IFanSpendLists from '../types/IFanSpendLists';

const fanSpendListsModel: Schema = new Schema<IFanSpendLists>({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Creator',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    minSpend: {
        type: Number,
        required: true,
    },
    maxSpend: {
        type: Number,
        required: true,
    },
    includeExpired: {
        type: Boolean,
        required: true,
    },
});

const FanSpendListsModel = mongoose.model<
    IFanSpendLists,
    mongoose.Model<IFanSpendLists>
>('fan_spend_lists', fanSpendListsModel);
export default FanSpendListsModel;
