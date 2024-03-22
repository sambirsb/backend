import { ITeamMember } from '../../types';
import { TeamMemberForResp } from '../../generated/graphql';

export const toTMGraphQL = (member: ITeamMember) => {
    return {
        id: member.id.toString(),
        teamId: member.teamId.toString(),
        userId: member.userId.toString(),
        memberName: member.memberName,
        active: member.active,
        note: member.note,
        permissions: member.permissions
            ? member.permissions.map((perm) => ({
                  creatorId: perm.creatorId.toString(),
                  startOFProfile: perm.startOFProfile,
                  seeCreatorStats: perm.seeCreatorStats,
                  seeTracking: perm.seeTracking,
                  setupMessagesFunctions: perm.setupMessagesFunctions,
                  modifyCreatorSettings: perm.modifyCreatorSettings,
              }))
            : [],
        role: member.role,
    } as TeamMemberForResp;
};
