import { elevateError } from '../../errors/elevateError';
import { ITeam } from '../../types';
import { ChangeTaskInput, CreateTaskInput } from '../../generated/graphql';

export const checkPerformersInTeam = async (
    team: ITeam,
    input: CreateTaskInput | ChangeTaskInput
) => {
    try {
        const teamMemberIdsAsStrings = team.teamMemberIds.map((id) =>
            id.toString()
        );

        const missingPerformerIds = input.performerIds.filter(
            (id) => !teamMemberIdsAsStrings.includes(id)
        );

        if (missingPerformerIds.length > 0) {
            throw new Error(
                `The following performer IDs are not members of this team: ${missingPerformerIds.join(
                    ', '
                )}`
            );
        }
    } catch (err) {
        elevateError(err);
    }
};
