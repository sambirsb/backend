import userService from '../../services/UserService';
import { UserDto, UserRole } from '../../generated/graphql';

export const adminRoleCheck = async (token: string): Promise<UserDto> => {
    try {
        const user = (await userService.getUserByToken(token)) as UserDto;

        if (!user) {
            throw new Error('User not found');
        }

        if (user.role !== UserRole.Admin) {
            throw new Error(`User with id ${user.id} is not an admin`);
        }

        return user;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};

export const adminRoleCheckFromExtension = async (
    token: string
): Promise<UserDto> => {
    try {
        const user = (await userService.getUserByExtensionToken(
            token
        )) as UserDto;

        if (!user) {
            throw new Error('User not found');
        }

        if (user.role !== UserRole.Admin) {
            throw new Error(`User with id ${user.id} is not an admin`);
        }

        return user;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
