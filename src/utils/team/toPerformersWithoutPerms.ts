import { ITeamMember } from '../../types';
import { PerformerWithoutPerms } from '../../generated/graphql';

export const toPerformersWithoutPerms = (teamPopulated: any) => {
    let membersWithoutPerms: PerformerWithoutPerms[] = [];

    if (teamPopulated) {
        membersWithoutPerms = teamPopulated.teamMemberIds.map(
            (member: ITeamMember) => ({
                id: member._id,
                teamId: teamPopulated._id,
                userId: member.userId,
                memberName: member.memberName,
                active: member.active,
                note: member.note,
                role: member.role,
            })
        );
    }

    return membersWithoutPerms;
};
