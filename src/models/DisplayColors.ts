import mongoose, { Schema } from 'mongoose';
import { IDisplayColors } from '../types';
import { Colors } from '../constants/colors';

const displayColorsModel: Schema = new Schema<IDisplayColors>({
    displaySettings: {
        type: Schema.Types.ObjectId,
        ref: 'DisplaySettings',
        required: true,
    },
    spend: {
        type: Number,
        min: 0,
        required: true,
        default: 0,
    },
    color: {
        type: String,
        required: true,
        default: Colors.DEFAULT,
    },
    inboxColor: {
        type: String,
        required: true,
        default: Colors.DEFAULT,
    },
});

const DisplayColorsModel = mongoose.model<
    IDisplayColors,
    mongoose.Model<IDisplayColors>
>('display_colors', displayColorsModel);
export default DisplayColorsModel;
