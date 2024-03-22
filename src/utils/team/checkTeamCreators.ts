import { Types } from 'mongoose';
import { elevateError } from '../../errors/elevateError';
import { AddTeamMemberInput, PermissionInput } from '../../generated/graphql';

export const checkTeamCreators = async (
    input: AddTeamMemberInput,
    creatorIds: Types.ObjectId[]
) => {
    try {
        if (!input.permissions || !input.permissions.length) {
            throw new Error('Permissions not provided.');
        }

        const permissions = input.permissions as PermissionInput[];

        const inputCreatorIds = permissions.map(
            (permission) => permission.creatorId
        );

        const creatorIdsAsStrings = creatorIds.map((id) => id.toString());

        const missingCreatorIds = inputCreatorIds.filter(
            (id) => !creatorIdsAsStrings.includes(id)
        );

        if (missingCreatorIds.length > 0) {
            throw new Error(
                `The following creator IDs are not from this team: ${missingCreatorIds.join(
                    ', '
                )}`
            );
        }
    } catch (err) {
        elevateError(err);
    }
};
