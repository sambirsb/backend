import { Types, Document } from 'mongoose';

export interface ISessionSecret extends Document {
    userId: Types.ObjectId;
    ascii?: string;
    hex?: string;
    base32: string;
    otpauth_url?: string;
    isActive: boolean;
    disabled: boolean;
}
