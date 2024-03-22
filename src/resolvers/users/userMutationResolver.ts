import { UserRole } from '../../constants/UserRole';
import userService from '../../services/UserService';
import authService from '../../services/AuthService';
import teamService from '../../services/TeamService';
import { sendLoginEmail, sendRegisterEmail } from '../../utils/sendGridUtils';
import { elevateError } from '../../errors/elevateError';
import {
    ChangePasswordInput,
    LoginInput,
    RegisterUserInput,
    CreateNewPasswordInput,
    ChangeUserInput,
} from '../../generated/graphql';

const userMutationResolvers = {
    Mutation: {
        async register(_: unknown, { input }: { input: RegisterUserInput }) {
            try {
                const result = await userService.createUser({
                    ...input,
                    role: UserRole.USER,
                });

                if (!result) {
                    throw new Error('User not found');
                }

                await teamService.createTeam(result.user.id);

                await sendRegisterEmail(input.email);

                const { user, token } = result;

                const teams = await teamService.getAllTeamsRelatedToUser(
                    user.id
                );

                return {
                    message: `User with email: ${user.email} successfully created`,
                    user,
                    token,
                    teams,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async login(_: unknown, { input }: { input: LoginInput }) {
            try {
                const result = await userService.authenticate(input);

                if (!result) {
                    throw new Error('User not found');
                }

                const { user, token, teams } = result;

                await sendLoginEmail(user.email);

                return {
                    message: `User with id ${user.id} successfully authenticated`,
                    user,
                    token,
                    teams,
                };
            } catch (err) {
                elevateError(err);
            }
        },

        async forgotPassword(_: unknown, { login }: { login: string }) {
            try {
                return await userService.sendPasswordResetCode(login);
            } catch (err) {
                elevateError(err);
            }
        },

        async changePassword(
            _: unknown,
            { input }: { input: ChangePasswordInput }
        ) {
            try {
                return await userService.changePassword(input);
            } catch (err) {
                elevateError(err);
            }
        },

        async changeUser(
            _: unknown,
            { input }: { input: ChangeUserInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                const userId = authService.getUserIdFromToken(token);

                return await userService.changeUser(userId, input);
            } catch (err) {
                elevateError(err);
                throw new Error('Error updating user details.');
            }
        },

        async createNewPassword(
            _: unknown,
            { input }: { input: CreateNewPasswordInput },
            context: any
        ) {
            try {
                const token = authService.checkToken(context.token);
                return await userService.createNewPassword(input, token);
            } catch (err) {
                elevateError(err);
            }
        },
    },
};

export default userMutationResolvers;
