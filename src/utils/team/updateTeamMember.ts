import { Types } from 'mongoose';
import { CreatorPermissions, ITeamMember } from '../../types';
import {
    ChangeTeamMemberInput,
    PermissionInput,
} from '../../generated/graphql';
import { elevateError } from '../../errors/elevateError';

export const updateTeamMember = async (
    input: ChangeTeamMemberInput,
    member: ITeamMember
) => {
    try {
        if (input.name) member.memberName = input.name;
        if (input.note) member.note = input.note;

        if (input.permissions && input.permissions.length > 0) {
            const validPermissions = input.permissions.filter(
                Boolean
            ) as PermissionInput[];

            const updatedPermissions: CreatorPermissions[] =
                validPermissions.map((perm) => ({
                    creatorId: new Types.ObjectId(perm.creatorId),
                    modifyCreatorSettings: perm.modifyCreatorSettings ?? false,
                    seeTracking: perm.seeTracking ?? false,
                    seeCreatorStats: perm.seeCreatorStats ?? false,
                    setupMessagesFunctions:
                        perm.setupMessagesFunctions ?? false,
                    startOFProfile: perm.startOFProfile ?? false,
                }));

            member.permissions = member.permissions.map((existingPerm) => {
                const inputPerm = updatedPermissions.find((updPerm) =>
                    updPerm.creatorId.equals(existingPerm.creatorId)
                );
                if (inputPerm) {
                    return { ...existingPerm, ...inputPerm };
                }
                return existingPerm;
            });

            updatedPermissions.forEach((inputPerm) => {
                if (
                    !member.permissions.some((existingPerm) =>
                        existingPerm.creatorId.equals(inputPerm.creatorId)
                    )
                ) {
                    member.permissions.push(inputPerm);
                }
            });
        }

        return member as ITeamMember;
    } catch (err) {
        elevateError(err);
    }
};
