import { ITeam, IUser } from '../../types';
import { CreateTeamMemberInput } from '../../types';
import { AddTeamMemberInput } from '../../generated/graphql';

export const toTMMongo = (
    team: ITeam | undefined,
    user: IUser,
    input: AddTeamMemberInput,
    memberToken: string,
    expire: Date
): CreateTeamMemberInput => {
    if (!team) {
        throw new Error('Team not found for toTMMongo');
    }

    return {
        teamId: team.id.toString(),
        userId: user.id.toString(),
        memberName: input.name,
        note: input.note || '',
        permissions: input.permissions
            ? input.permissions.map((perm) => ({
                  creatorId: perm?.creatorId.toString() ?? '',
                  startOFProfile: perm?.startOFProfile ?? false,
                  seeCreatorStats: perm?.seeCreatorStats ?? false,
                  seeTracking: perm?.seeTracking ?? false,
                  setupMessagesFunctions: perm?.setupMessagesFunctions ?? false,
                  modifyCreatorSettings: perm?.modifyCreatorSettings ?? false,
              }))
            : [],
        acceptLink: {
            memberToken,
            expire,
        },
    };
};
