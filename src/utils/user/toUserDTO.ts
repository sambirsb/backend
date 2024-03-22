import { UserDto } from '../../generated/graphql';
import { IUser } from '../../types';

export const toUserDTO = (user: IUser): UserDto => {
    return {
        id: user.id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role ?? undefined,
        lastActivity: user.lastActivity,
        avatarUrl: user.avatarUrl,
        isTwoFactorEnabled: user.isTwoFactorEnabled,
    };
};
