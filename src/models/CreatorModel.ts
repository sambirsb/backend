import mongoose, { Schema } from 'mongoose';
import { ICreator } from '../types';

const preferenceSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        subscriberId: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const creatorSchema: Schema = new Schema<ICreator>(
    {
        link: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        license: {
            subscriptionId: String,
            customerId: String,
            startDate: Date,
            endDate: Date,
            status: Boolean,
        },
        userName: String,
        avatarURL: String,
        joinDate: Date,
        creatorAuth: {
            user_agent: String,
            x_bc: String,
            user_id: {
                type: String,
                unique: true,
                required: true,
            },
            cookie: String,
            expiredAt: Date,
        },
        preferences: [preferenceSchema],
        collectionListId: String,
        lastUpdatedDate: Date,
        appAuth: {
            sess: String,
            bcTokenSha: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'creators',
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

creatorSchema.virtual('proxy', {
    ref: 'Proxy',
    localField: '_id',
    foreignField: 'creatorId',
    justOne: true,
});

const CreatorModel = mongoose.model<ICreator, mongoose.Model<ICreator>>(
    'Creator',
    creatorSchema
);
export default CreatorModel;
