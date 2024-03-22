import { Connection, Model, Schema } from 'mongoose';
import { IPublicData } from '../typesStat';

const publicDataModel: Schema = new Schema<IPublicData>(
    {
        _id: {
            type: Number,
            required: true,
        },
        pathId: {
            type: String,
            required: true,
        },
        avatarURL: String,
        userName: String,
        joinDate: Date,
    },
    {
        timestamps: true,
    }
);

const PublicDataModel = (connection: Connection) => {
    return connection.model<IPublicData, Model<IPublicData>>(
        'public_data',
        publicDataModel
    );
};

export default PublicDataModel;
