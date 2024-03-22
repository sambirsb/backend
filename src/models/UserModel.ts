import mongoose, { Schema } from 'mongoose';
import { UserRole } from '../constants/UserRole';
import { IUser } from '../types';

const userSchema: Schema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        resetPassword: {
            resetCode: Number,
            expire: Date,
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.USER,
        },
        avatarUrl: String,
        isTwoFactorEnabled: {
            type: Boolean,
            default: false,
        },
        lastActivity: Date,
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'users',
    }
);

const UserModel = mongoose.model<IUser, mongoose.Model<IUser>>(
    'User',
    userSchema
);
export default UserModel;
