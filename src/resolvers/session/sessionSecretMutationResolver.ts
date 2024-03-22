import qrcode from 'qrcode';
import { sessionSecretService } from '../../services/SessionSecretService';
import authService from '../../services/AuthService';
import userService from '../../services/UserService';
import { IUser } from '../../types';
import { ScanQrcodeInput } from '../../generated/graphql';

const sessionSecretMutationResolver = {
    Mutation: {
        async sessionGenerateQrcode(_: any, __: any, context: any) {
            const token = authService.checkToken(context.token);
            const sessionSecret =
                await sessionSecretService.generateSessionSecret(token);

            if (!sessionSecret.otpauth_url) {
                throw new Error('No otpauth_url found for the session secret.');
            }

            const qrCodeUrl = await qrcode.toDataURL(sessionSecret.otpauth_url);

            return {
                qrCodeUrl,
                message: 'QR Code generated successfully.',
            };
        },

        async sessionScanQrcode(_: any, { input }: { input: ScanQrcodeInput }) {
            const isVerified = await sessionSecretService.verifyCode(input);
            const user = (await userService.getUserById(input.userId)) as IUser;
            if (!user) {
                throw new Error('User not found.');
            }

            if (!isVerified) {
                throw new Error('Invalid token. QR code scan failed.');
            }

            await sessionSecretService.enableTwoFactorAuthentication(
                input.userId
            );

            return {
                message: 'QR Code scanned successfully.',
                user: user,
            };
        },
    },
};

export default sessionSecretMutationResolver;
