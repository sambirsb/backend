import { TeamMemberWithEmails } from '../../generated/graphql';

export const toTMWithEmails = (
    membersPopulated: any[]
): TeamMemberWithEmails[] => {
    return membersPopulated.map((member) => ({
        id: member._id,
        teamId: member.teamId,
        userId: member.userId._id,
        email: member.userId.email,
        memberName: member.memberName,
        active: member.active,
        note: member.note,
        permissions: member.permissions,
        role: member.role,
    }));
};
