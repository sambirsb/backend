import userService from '../src/services/UserService';
import authService from '../src/services/AuthService';
import UserModel from '../src/models/UserModel';
import { IUser } from '../src/types';

jest.mock('../src/services/AuthService', () => ({
    getUserIdFromToken: jest.fn(),
}));

jest.mock('../src/models/UserModel', () => ({
    findById: jest.fn(),
}));

describe('getUserByToken', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return user data when a valid token is provided', async () => {
        const mockUserId = '65d3b27a24deafe25c14b79b';
        const mockUser: IUser = {
            id: mockUserId,
            email: 'test@example.com',
            fullName: 'Test User',
            role: undefined
        } as IUser;


        (authService.getUserIdFromToken as jest.Mock).mockReturnValue(mockUserId);
        (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);

        const result = await userService.getUserByToken('validToken');

        expect(result).toEqual({
            id: mockUserId,
            email: 'test@example.com',
            fullName: 'Test User',
            role: undefined,
        });


        expect(authService.getUserIdFromToken).toHaveBeenCalledWith('validToken');
        expect(UserModel
            .findById).toHaveBeenCalledWith(mockUserId);
        expect(result).toEqual(mockUser);
    });

    it('should throw an error when an invalid token is provided', async () => {
        (authService.getUserIdFromToken as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid token');
        });

        await expect(userService.getUserByToken('invalidToken')).rejects.toThrow('Invalid token');
        expect(UserModel.findById).not.toHaveBeenCalled();
    });
});
