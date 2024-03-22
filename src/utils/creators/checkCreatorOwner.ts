import authService from '../../services/AuthService';
import creatorService from '../../services/CreatorService';
import teamService from '../../services/TeamService';
import { ICreator } from '../../types';

export const checkCreatorOwner = async (token: string, creatorId: string) => {
    const data = authService.getDataFromToken(token);

    if (!data) {
        throw new Error('User not found');
    }

    const creator = (await creatorService.getCreatorById(
        creatorId
    )) as ICreator;
    if (!creator) {
        throw new Error('Creator not found');
    }
    if (creator.userId.toString() === data.id) {
        return creator;
    }

    const hasTeamAccess = await teamService.getTeamMemberIdByExtension(
        data.id,
        creator.id
    );
    if (!hasTeamAccess) {
        throw new Error('You are not owner of this creator');
    }

    return creator;
};

export const checkCreatorOwnerByExtension = async (
    token: string,
    user_id: string
) => {
    const userId = authService.getUserIdFromExtensionToken(token);
    const creator = (await creatorService.getCreatorByAuthUser_Id(
        user_id
    )) as ICreator;

    if (creator.userId.toString() !== userId) {
        await teamService.getTeamMemberIdByExtension(userId, creator.id);
    }

    return creator;
};
