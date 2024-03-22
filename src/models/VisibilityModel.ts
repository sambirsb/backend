import mongoose, { Schema } from 'mongoose';
import IVisibility from '../types/IVisibility';

const visibilityModel: Schema = new Schema<IVisibility>(
    {
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        showScripts: {
            type: Boolean,
            default: true,
        },
        showFanDetails: {
            type: Boolean,
            default: true,
        },
        showGlobalInfo: {
            type: Boolean,
            default: true,
        },
        showFanSpending: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const VisibilityModel = mongoose.model<
    IVisibility,
    mongoose.Model<IVisibility>
>('Visibility', visibilityModel);
export default VisibilityModel;
