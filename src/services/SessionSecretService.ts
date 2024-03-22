import mongoose from 'mongoose';
import speakeasy from 'speakeasy';
import SessionSecret from '../models/SessionSecretModel';
import authService from './AuthService';
import userService from './UserService';
import { ISessionSecret } from '../types';
import { ScanQrcodeInput } from '../generated/graphql';

class SessionSecretService {
    private model: typeof SessionSecret = SessionSecret;

    async generateSessionSecret(token: string): Promise<ISessionSecret> {
        const user = authService.getDataFromToken(token);
        if (!user) {
            throw new Error('Invalid token.');
        }

        const oldSessionSecret = await this.findByUserId(user.id);
        if (oldSessionSecret) {
            await this.model.findByIdAndDelete(oldSessionSecret._id).exec();
        }

        const secret = speakeasy.generateSecret();

        const sessionSecretData = {
            userId: user.id,
            ascii: secret.ascii,
            hex: secret.hex,
            base32: secret.base32,
            otpauth_url: secret.otpauth_url,
            isActive: true,
        };

        return this.model.create(sessionSecretData);
    }

    async verifyCode(data: ScanQrcodeInput) {
        const { userId, code } = data;

        const sessionSecret = await this.findByUserId(userId);
        if (!sessionSecret) {
            throw new Error('No active QR code found for this user.');
        }

        if (!sessionSecret.base32) {
            throw new Error('Base32 secret not found for the user.');
        }

        return speakeasy.totp.verify({
            secret: sessionSecret.base32,
            encoding: 'base32',
            token: code,
        });
    }

    async findByUserId(userId: string): Promise<ISessionSecret | null> {
        return this.findByField({ userId, isActive: true });
    }

    async enableTwoFactorAuthentication(userId: string): Promise<void> {
        const userSessionSecret = await this.findByUserId(userId);
        if (!userSessionSecret) {
            throw new Error('No session secret found for the user.');
        }

        userSessionSecret.isActive = true;
        await userService.enableTwoFactorAuth(userId);
        await userSessionSecret.save();
    }

    private async findByField(
        field: mongoose.FilterQuery<ISessionSecret>
    ): Promise<ISessionSecret | null> {
        return this.model.findOne(field).exec();
    }
}

export const sessionSecretService = new SessionSecretService();
