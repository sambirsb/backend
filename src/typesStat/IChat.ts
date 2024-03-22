import { Document, Types } from 'mongoose';

export interface IChat extends Document {
    _id: Types.ObjectId;
    user_id: number;
    friend_user_id: number;
    openChatDate: Date;
    hasSellingChat: boolean;
}
