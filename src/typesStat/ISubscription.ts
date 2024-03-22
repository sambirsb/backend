import { Document } from 'mongoose';
import { IPublicData, OFSubUser } from './';

export interface ISubscription extends Document {
    _id: number;
    user_id: number;
    friend_user_id: number;
    userData: IPublicData | null;
    friendUserData: IPublicData | null;
    startDate: Date;
    price: number;
    OF_subUser: OFSubUser;
}
