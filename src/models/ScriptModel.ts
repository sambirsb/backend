import mongoose, { Schema } from 'mongoose';
import { NameType } from '../constants/NameType';
import { IScript } from '../types';

const scriptModel: Schema = new Schema<IScript>(
    {
        scriptFolder: {
            type: Schema.Types.ObjectId,
            ref: 'ScriptFolder',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        fallbackName: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        customName: {
            type: String,
            enum: Object.values(NameType),
            default: NameType.UPPER,
        },
        fanName: {
            type: String,
            enum: Object.values(NameType),
            default: NameType.UPPER,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ScriptModel = mongoose.model<IScript, mongoose.Model<IScript>>(
    'Script',
    scriptModel
);
export default ScriptModel;
