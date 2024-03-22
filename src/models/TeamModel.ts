import { model, Model, Schema } from 'mongoose';
import { ITeam } from '../types';

const teamModel: Schema = new Schema<ITeam>(
    {
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        teamName: { type: String, required: true },
        creatorIds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Creator',
            },
        ],
        teamMemberIds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'TeamMember',
            },
        ],
        logoUrl: String,
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

teamModel.virtual('creators', {
    ref: 'Creator',
    localField: 'creatorIds',
    foreignField: '_id',
});

teamModel.virtual('teamMembers', {
    ref: 'TeamMember',
    localField: 'teamMemberIds',
    foreignField: '_id',
});

const TeamModel = model<ITeam, Model<ITeam>>('Team', teamModel);

export default TeamModel;
