import mongoose, { Schema } from 'mongoose';
import { IPPVFollow } from '../types';

const ppvFollowModel: Schema = new Schema<IPPVFollow>({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Creator',
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
    include: {
        type: Boolean,
        default: false,
    },
    time: {
        type: Number,
        default: 15,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const PPVFollowModel = mongoose.model<IPPVFollow, mongoose.Model<IPPVFollow>>(
    'PPVFollow',
    ppvFollowModel
);
export default PPVFollowModel;
