import jwt from 'jsonwebtoken';
import { EXPIRE_TIME_TOKEN } from '../constants/others';
import { Payload, PayloadExtension, PayloadIdOnly } from '../types';

class AuthService {
    generateToken(id: string, name: string | undefined): string {
        const payload: Payload = { id, name };

        return jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: EXPIRE_TIME_TOKEN,
        });
    }

    generateExtensionToken(id: string, creatorId: string): string {
        const payload: PayloadExtension = { id, creatorId };

        return jwt.sign(payload, process.env.JWT_SECRET_EXTENSION!, {
            expiresIn: EXPIRE_TIME_TOKEN,
        });
    }

    generateIdExtensionToken(userId: string): string {
        const payload: PayloadIdOnly = { userId };
        return jwt.sign(payload, process.env.JWT_SECRET_EXTENSION!, {
            expiresIn: EXPIRE_TIME_TOKEN,
        });
    }

    getDataFromToken(token: string) {
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as Payload;

            return { id: decoded.id, name: decoded.name };
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    getUserIdFromToken(token: string) {
        const data = this.getDataFromToken(token);
        if (!data) throw new Error('Invalid token');

        return data.id;
    }

    getDataFromTokenContext(token: string) {
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as Payload;

            return { id: decoded.id, name: decoded.name };
        } catch (err) {
            console.error('Error:', err);
        }
    }

    getDataFromExtensionToken(token: string): PayloadExtension | null {
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET_EXTENSION!
            ) as PayloadExtension;

            return { id: decoded.id, creatorId: decoded.creatorId };
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    getUserIdFromExtensionToken(token: string) {
        const data = this.getDataFromExtensionToken(token);
        if (!data) throw new Error('Invalid extension token');

        return data.id;
    }

    getDataFromGeneratedIdExtensionToken(token: string): PayloadIdOnly | null {
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET_EXTENSION!
            ) as PayloadIdOnly;

            return { userId: decoded.userId };
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    verifyToken(token: string): boolean | null {
        try {
            jwt.verify(token, process.env.JWT_SECRET!);

            return true;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    verifyExtensionToken(token: string): boolean {
        try {
            jwt.verify(token, process.env.JWT_SECRET_EXTENSION!);

            return true;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    verifyGenerateIdExtensionToken(token: string): boolean {
        try {
            jwt.verify(token, process.env.JWT_SECRET_EXTENSION!);
            return true;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    checkToken(token: string): string {
        if (!token) throw new Error('Token is missing.');
        if (!this.verifyToken(token))
            throw new Error('Invalid or expired token.');
        return token;
    }

    checkExtToken(token: string): string {
        if (!token) throw new Error('Token is missing.');
        if (!this.verifyExtensionToken(token))
            throw new Error('Invalid or expired extension token.');
        return token;
    }

    checkGenerateIdExtensionToken(token: string): string {
        if (!token) throw new Error('Token is missing.');
        if (!this.verifyGenerateIdExtensionToken(token))
            throw new Error('Invalid or expired generated ID extension token.');
        return token;
    }
}

const authService = new AuthService();
export default authService;
