import UserModel from '../models/UserModel';
import authService from './AuthService';
import teamService from './TeamService';
import { validateNewPassword } from '../validation/userValidation';
import { UserExistsError, UserNotFoundError } from '../errors/userErrors';
import {
    emailValidate,
    validateLogin,
    validateRegister,
} from '../validation/userValidation';
import { elevateError } from '../errors/elevateError';
import {
    toUserDTO,
    comparePasswordHash,
    createPasswordHash,
    isEmail,
    generateRandomCode,
    sendPasswordCodeEmail,
    deleteImageFromS3,
} from '../utils';
import { UserCreationData, IUser } from '../types';
import {
    ChangePasswordInput,
    ChangeUserInput,
    CreateNewPasswordInput,
    LoginInput,
    UserDto,
} from '../generated/graphql';

class UserService {
    private model: typeof UserModel = UserModel;

    async getUserById(id: string): Promise<UserDto> {
        try {
            const user = (await this.model.findById(id)) as IUser;

            if (!user) {
                throw new Error('User not found');
            }

            return toUserDTO(user);
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async getUserByToken(token: string): Promise<UserDto> {
        try {
            const userId = authService.getUserIdFromToken(token);
            const user = (await this.model.findById(userId)) as IUser;

            if (!user) {
                throw new Error('User not found');
            }

            return toUserDTO(user);
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async getUserByExtensionToken(token: string): Promise<UserDto> {
        try {
            const data = authService.getDataFromExtensionToken(token);

            if (!data) {
                throw new Error('Failed to extract data from token.');
            }

            const user = (await this.model.findById(data.id)) as IUser;

            if (!user) {
                throw new Error('User not found');
            }

            return toUserDTO(user);
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async getUserByTokenWithCreators(token: string) {
        try {
            const user = await this.getUserByToken(token);
            await this.model.updateOne(
                { _id: user.id },
                { $set: { lastActivity: new Date() } }
            );

            const teams = await teamService.getAllTeamsRelatedToUser(user.id);

            const newToken = authService.generateToken(
                user.id,
                user.fullName || ''
            );

            return {
                user,
                teams,
                newToken,
            };
        } catch (err) {
            elevateError(err);
        }
    }

    async getUserByGenerateIdExtensionToken(token: string): Promise<UserDto> {
        try {
            const data =
                authService.getDataFromGeneratedIdExtensionToken(token);

            if (!data) {
                throw new Error('Failed to extract data from token.');
            }

            const user = (await this.model.findById(data.userId)) as IUser;

            if (!user) {
                throw new Error('User not found');
            }

            return toUserDTO(user);
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async createUser(data: UserCreationData) {
        try {
            await validateRegister(data);

            const existingUser = await this.findUserByEmail(data.email);
            if (existingUser) {
                throw UserExistsError(data.email);
            }

            if (!data.password) {
                throw Error('Password is required');
            }

            const passwordHash = await createPasswordHash(data.password);
            delete data.password;

            const user = await this.model.create({ ...data, passwordHash });
            const token = authService.generateToken(user.id, user.fullName);

            const dto = toUserDTO(user);

            return { user: dto, token };
        } catch (err) {
            elevateError(err);
        }
    }

    async authenticate(data: LoginInput) {
        try {
            await validateLogin(data);

            const user = (await this.findUserByLogin(data.login)) as IUser;

            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await comparePasswordHash(
                data.password,
                user.passwordHash
            );
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            const token = authService.generateToken(user.id, user.fullName);
            const dto = toUserDTO(user);

            const teams = await teamService.getAllTeamsRelatedToUser(user.id);

            return {
                user: dto,
                token,
                teams,
            };
        } catch (err) {
            elevateError(err);
        }
    }

    async authenticateByExtension(email: string, password: string) {
        try {
            await emailValidate(email);

            const user = (await this.findUserByEmail(email)) as IUser;

            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await comparePasswordHash(
                password,
                user.passwordHash
            );
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            return toUserDTO(user);
        } catch (err) {
            elevateError(err);
        }
    }

    async sendPasswordResetCode(login: string) {
        try {
            const user = await this.findUserByLogin(login);

            if (!user) {
                throw new Error('User not found');
            }

            const resetCode = generateRandomCode(5);
            const expirationTime = new Date(
                Date.now() + 60 * 60 * 1000
            ).toString();

            if (!user.resetPassword) {
                user.resetPassword = {};
            }

            user.resetPassword.resetCode = resetCode;
            user.resetPassword.expire = expirationTime;

            await user.save();

            return await sendPasswordCodeEmail(resetCode, user.email);
        } catch (err) {
            elevateError(err);
        }
    }

    async changePassword(data: ChangePasswordInput) {
        try {
            const { login, newPassword, resetCode } = data;

            const user = await this.findUserByLogin(login);

            if (!user) {
                throw UserNotFoundError(login);
            }

            if (user.resetPassword?.resetCode !== resetCode) {
                throw new Error('Invalid reset code.');
            }

            if (!user.resetPassword?.expire) {
                throw new Error(
                    'Reset code expiry information is missing or invalid.'
                );
            }

            const expirationDate = new Date(user.resetPassword.expire);

            if (isNaN(expirationDate.getTime())) {
                throw new Error('Invalid expiration date.');
            }

            if (new Date() > expirationDate) {
                throw new Error('Reset code has expired.');
            }

            user.passwordHash = await createPasswordHash(newPassword);
            await user.save();

            return 'Password successfully changed.';
        } catch (err) {
            elevateError(err);
        }
    }

    getAppURL(): string {
        return process.env.NODE_ENV === 'production'
            ? process.env.FRONTEND_URL || 'defaultProductionURL'
            : process.env.LOCALHOST_URL || 'defaultTestURL';
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return this.findByField({ email });
    }

    async createNewPassword(input: CreateNewPasswordInput, token: string) {
        await validateNewPassword(input);

        const { oldPassword, newPassword } = input;

        const userId = authService.getUserIdFromToken(token);

        const user = (await this.model.findById(userId)) as IUser;
        if (!user) {
            throw UserNotFoundError(userId);
        }

        const isPasswordValid = await comparePasswordHash(
            oldPassword,
            user.passwordHash
        );

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        user.passwordHash = await createPasswordHash(newPassword);
        await user.save();

        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            passwordHash: user.passwordHash,
            resetPassword: user.resetPassword,
            role: user.role,
            avatarUrl: user.avatarUrl,
            isTwoFactorEnabled: user.isTwoFactorEnabled,
        };
    }

    async changeUser(userId: string, input: ChangeUserInput) {
        const user = (await this.model.findById(userId)) as IUser;
        if (!user) {
            throw new Error('User not found');
        }

        if (input.avatarUrl === '') {
            if (user.avatarUrl) {
                const fileName = user.avatarUrl.split('/').pop() as string;
                await deleteImageFromS3(fileName);
            }
            user.avatarUrl = undefined;
        } else if (input.avatarUrl) {
            user.avatarUrl = input.avatarUrl;
        }

        if (input.name) user.fullName = input.name;
        if (input.avatarUrl) user.avatarUrl = input.avatarUrl;

        await user.save();

        return user;
    }

    async enableTwoFactorAuth(userId: string) {
        const user = (await this.model.findById(userId)) as IUser;
        if (!user) {
            throw new Error('User not found');
        }
        user.isTwoFactorEnabled = true;
        return await user.save();
    }

    private async findByField(
        field: Partial<UserCreationData>
    ): Promise<IUser | null> {
        return this.model.findOne(field) as Promise<IUser | null>;
    }

    private async findUserByLogin(login: string) {
        if (await isEmail(login)) {
            return await this.findUserByEmail(login);
        } else {
            return await this.findUserByFullName(login);
        }
    }

    private async findUserByFullName(fullName: string): Promise<IUser | null> {
        return this.model.findOne({ fullName }) as Promise<IUser | null>;
    }
}
const userService = new UserService();
export default userService;
