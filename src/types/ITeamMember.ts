import { Document, Types } from 'mongoose';
import { ITeamCreators } from './ITeam';
import {
    TeamMember as GraphQLTeamMember,
    Permissions as GraphQLPermissions,
} from '../generated/graphql';

export interface ITeamMember
    extends Document,
        Omit<GraphQLTeamMember, 'id' | 'teamId' | 'userId' | 'permissions'> {
    _id: Types.ObjectId;
    teamId: Types.ObjectId;
    userId: Types.ObjectId;
    permissions: CreatorPermissions[];
}

export interface CreatorPermissions
    extends Omit<GraphQLPermissions, 'creatorId'> {
    creatorId: Types.ObjectId;
}

export interface ITeamMemberTeam
    extends Document,
        Omit<GraphQLTeamMember, 'id' | 'teamId' | 'userId' | 'permissions'> {
    _id: Types.ObjectId;
    teamId: Types.ObjectId;
    team: ITeamCreators[];
    userId: Types.ObjectId;
    permissions: CreatorPermissions[];
}
