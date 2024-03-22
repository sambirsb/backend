import { Connection, Schema } from 'mongoose';
import { IChatterTracking } from '../types';

const chatterTrackingModel: Schema = new Schema<IChatterTracking>(
    {
        teamMemberId: {
            type: Schema.Types.ObjectId,
            ref: 'TeamMember',
            required: true,
        },
        msgsSent: {
            type: Number,
            default: 0,
        },
        ppvsSent: {
            type: Number,
            default: 0,
        },
        ppvsUnlocked: {
            type: Number,
            default: 0,
        },
        sales: {
            type: Number,
            default: 0,
        },
        fansChatted: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ChatterTrackingModel = (connection: Connection) => {
    return connection.model('chatter_tracking', chatterTrackingModel);
};

export default ChatterTrackingModel;
