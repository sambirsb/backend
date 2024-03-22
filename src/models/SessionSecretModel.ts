import mongoose, { Schema } from 'mongoose';
import { ISessionSecret } from '../types';

const sessionSecretSchema = new Schema<ISessionSecret>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        ascii: { type: String },
        hex: { type: String },
        base32: {
            type: String,
            required: true,
        },
        otpauth_url: { type: String },
        isActive: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const SessionSecretModel = mongoose.model<
    ISessionSecret,
    mongoose.Model<ISessionSecret>
>('SessionSecret', sessionSecretSchema);
export default SessionSecretModel;
