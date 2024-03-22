import { ITeamMember } from '../../types';

export const toTMMongoWithEmail = (email: string, member: ITeamMember) => {
    if (!member) {
        throw new Error('Failed to create team member.');
    }

    return {
        id: member._id,
        teamId: member.teamId,
        userId: member.userId,
        email,
        memberName: member.memberName,
        active: member.active,
        note: member.note,
        permissions: member.permissions,
        role: member.role,
    };
};
