import { MyTeamPopulated } from '../../generated/graphql';

export const toTeamPopulated = (team: any) => {
    return {
        team: {
            id: team._id.toString(),
            ownerId: team.ownerId.toString(),
            teamName: team.teamName,
        },
        members: team.teamMemberIds.map((member: any) => ({
            id: member._id.toString(),
            teamId: member.teamId.toString(),
            userId: member.userId._id.toString(),
            email: member.userId.email,
            memberName: member.memberName,
            active: member.active,
            note: member.note,
            permissions: member.permissions,
            role: member.role,
        })),
    } as MyTeamPopulated;
};
