import { Document, Types } from 'mongoose';
import { ICreatorsProxy } from './ICreator';
import { Team as GraphQLTeam } from '../generated/graphql';

export interface ITeam
    extends Document,
        Omit<GraphQLTeam, 'id' | 'ownerId' | 'creatorIds' | 'teamMemberIds'> {
    _id: Types.ObjectId;
    ownerId: Types.ObjectId;
    creatorIds: Types.ObjectId[];
    teamMemberIds: Types.ObjectId[];
}

export interface ITeamCreators
    extends Document,
        Omit<GraphQLTeam, 'id' | 'ownerId' | 'creatorIds' | 'teamMemberIds'> {
    _id: Types.ObjectId;
    ownerId: Types.ObjectId;
    creators: ICreatorsProxy[];
    creatorIds: Types.ObjectId[];
    teamMemberIds: Types.ObjectId[];
}
