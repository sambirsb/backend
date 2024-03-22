import authService from '../../services/AuthService';
import teamService from '../../services/TeamService';
import { elevateError } from '../../errors/elevateError';
import { sendAddTeamMemberEmail } from '../../utils/sendGridUtils';
import {
    AddTeamMemberInput,
    ChangeTeamInput,
    ChangeTeamMemberInput,
} from '../../generated/graphql';

const teamMutationResolver = {
    Mutation: {
        async addTeamMember(
            _: unknown,
            { input }: { input: AddTeamMemberInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                await sendAddTeamMemberEmail(input.email, input.name);

                return await teamService.addTeamMember(token, input);
            } catch (err) {
                elevateError(err);
            }
        },

        async acceptTeamMember(
            _: unknown,
            { memberToken }: { memberToken: string }
        ) {
            try {
                return await teamService.acceptTeamMember(memberToken);
            } catch (err) {
                elevateError(err);
            }
        },

        async changeTeamMember(
            _: unknown,
            { input }: { input: ChangeTeamMemberInput }
        ) {
            try {
                return await teamService.changeTeamMember(input);
            } catch (err) {
                elevateError(err);
            }
        },

        async deleteTeamMember(
            _: unknown,
            { teamMemberId }: { teamMemberId: string },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);

                return await teamService.deleteMember(token, teamMemberId);
            } catch (err) {
                elevateError(err);
            }
        },

        async changeLastOnlineExtension(
            _: unknown,
            { teamMemberId }: { teamMemberId: string },
            context: any
        ) {
            try {
                const token = authService.checkExtToken(context.token);

                return await teamService.changeLastOnlineExtension(
                    token,
                    teamMemberId
                );
            } catch (err) {
                elevateError(err);
            }
        },

        async changeTeam(
            _: unknown,
            { input }: { input: ChangeTeamInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                const userId = authService.getUserIdFromToken(token);

                return await teamService.changeTeam(userId, input);
            } catch (err) {
                elevateError(err);
                throw new Error('Error updating user details.');
            }
        },
    },
};

export default teamMutationResolver;
