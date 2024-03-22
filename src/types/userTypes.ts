import { UserRole } from '../constants/UserRole';

interface UserCreationData {
    email: string;
    password?: string;
    fullName: string;
    role: UserRole;
}

export { UserCreationData };
