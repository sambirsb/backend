import { Model, model, Schema } from 'mongoose';
import { MemberRole } from '../constants/MemberRole';
import { ITeamMember } from '../types';

const permissionsModel: Schema = new Schema(
    {
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: 'Creator',
            required: true,
        },
        startOFProfile: {
            type: Boolean,
            required: true,
            default: false,
        },
        seeCreatorStats: {
            type: Boolean,
            required: true,
            default: false,
        },
        seeTracking: {
            type: Boolean,
            required: true,
            default: false,
        },
        setupMessagesFunctions: {
            type: Boolean,
            required: true,
            default: false,
        },
        modifyCreatorSettings: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        _id: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const teamMemberModel: Schema = new Schema<ITeamMember>(
    {
        teamId: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        memberName: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
            default: false,
        },
        note: String,
        permissions: [permissionsModel],
        role: {
            type: String,
            enum: Object.values(MemberRole),
            default: MemberRole.MEMBER,
        },
        acceptLink: {
            memberToken: String,
            expire: Date,
        },
        lastOnlineAt: Date,
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

teamMemberModel.virtual('team', {
    ref: 'Team',
    localField: 'teamId',
    foreignField: '_id',
    justOne: true,
});

teamMemberModel.virtual('permissions.creator', {
    ref: 'Creator',
    localField: 'permissions.creatorId',
    foreignField: '_id',
});

const TeamMemberModel = model<ITeamMember, Model<ITeamMember>>(
    'TeamMember',
    teamMemberModel
);
export default TeamMemberModel;
