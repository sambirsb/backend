import { AcceptLink } from '../generated/graphql';

interface CreateOwnerTeamMemberInput {
    teamId: string;
    userId: string;
    memberName: string;
    creatorIds: string[];
}

interface CreateTeamMemberInput {
    teamId: string;
    userId: string;
    memberName: string;
    note: string;
    permissions: CreatorPermissions[];
    acceptLink: AcceptLink;
}

interface CreatorPermissions {
    creatorId: string;
    startOFProfile: boolean;
    seeCreatorStats: boolean;
    seeTracking: boolean;
    setupMessagesFunctions: boolean;
    modifyCreatorSettings: boolean;
}

interface TeamDBPopulated {
    id: string;
    ownerId: string;
    teamMemberIds: Array<{
        userId: {
            email: string;
        };
    }>;
    teamName: string;
    creatorIds: string[];
}

export type {
    CreateOwnerTeamMemberInput,
    CreateTeamMemberInput,
    TeamDBPopulated,
};
