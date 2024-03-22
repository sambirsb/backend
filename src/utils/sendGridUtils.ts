import sgMail from '@sendgrid/mail';
import 'dotenv/config';
import { config } from '../constants/config/env';
import { emailTemplates } from '../constants/emailTemplates';
import userService from '../services/UserService';
import creatorService from '../services/CreatorService';

if (!config.SEND_GRID.apiKey) {
    throw new Error('Missing SendGrid API Key in environment variables');
}

if (!config.SEND_GRID.emailAddress) {
    throw new Error('Missing SendGrid email address in environment variables');
}

sgMail.setApiKey(config.SEND_GRID.apiKey);

const sendEmail = async (
    email: string,
    subject: string,
    textContent: string,
    htmlContent: string
) => {
    const message = {
        from: config.SEND_GRID.emailAddress,
        to: email,
        subject,
        text: textContent,
        html: htmlContent,
    };

    await sgMail.send(message);

    return `Email to ${email} has been sent successfully.`;
};

const sendPasswordCodeEmail = async (code: number, email: string) => {
    const textContent = emailTemplates.PasswordCode.text.replace(
        '[code]',
        code.toString()
    );
    const htmlContent = emailTemplates.PasswordCode.html.replace(
        '[code]',
        code.toString()
    );

    return await sendEmail(
        email,
        'Your Password Change Code',
        textContent,
        htmlContent
    );
};

const sendEmailWithAcceptTMLink = async (
    link: string,
    email: string,
    teamName: string
) => {
    const textContent = emailTemplates.AcceptTMLink.text.replace(
        '[link]',
        link
    );
    const htmlContent = emailTemplates.AcceptTMLink.html.replace(
        '[link]',
        link
    );

    return await sendEmail(
        email,
        `Confirm joining the ${teamName}`,
        textContent,
        htmlContent
    );
};

const sendChangeCreatorAuthByExtensionEmail = async (token: string) => {
    try {
        const user = await userService.getUserByExtensionToken(token);

        if (!user || !user.email) {
            throw new Error(
                `User with ID ${user.id} not found or email is missing`
            );
        }

        const newAuthDetails =
            emailTemplates.ChangeCreatorAuthByExtension.newAuthDetails;

        const textContent =
            emailTemplates.ChangeCreatorAuthByExtension.text.replace(
                '[newAuthDetails]',
                newAuthDetails
            );
        const htmlContent =
            emailTemplates.ChangeCreatorAuthByExtension.html.replace(
                '[newAuthDetails]',
                newAuthDetails
            );

        return await sendEmail(
            user.email,
            'Change in Authentication Details',
            textContent,
            htmlContent
        );
    } catch (err) {
        console.error(err);
    }
};

const sendLoginExtensionEmail = async (userEmail: string) => {
    try {
        if (!userEmail) {
            throw new Error('Email address is missing');
        }

        const loginDetails = emailTemplates.LoginExtension.loginDetails;

        const textContent = emailTemplates.LoginExtension.text.replace(
            '[loginDetails]',
            loginDetails
        );
        const htmlContent = emailTemplates.LoginExtension.html.replace(
            '[loginDetails]',
            loginDetails
        );

        return await sendEmail(
            userEmail,
            'Login Extension Notification',
            textContent,
            htmlContent
        );
    } catch (err) {
        console.error(err);
    }
};

const sendPaymentCheckoutEmail = async (creatorId: string) => {
    try {
        const creator = await creatorService.getCreatorById(creatorId);

        if (!creator || !creator.userId) {
            throw new Error(
                `Creator with ID ${creatorId} not found or userID is missing`
            );
        }

        const user = await userService.getUserById(creator.userId.toString());

        if (!user || !user.email) {
            throw new Error(
                `User with ID ${creator.userId.toString()} not found or email is missing`
            );
        }

        const paymentDetails = emailTemplates.PaymentCheckout.paymentDetails;

        const textContent = emailTemplates.PaymentCheckout.text.replace(
            '[paymentDetails]',
            paymentDetails
        );
        const htmlContent = emailTemplates.PaymentCheckout.html.replace(
            '[paymentDetails]',
            paymentDetails
        );

        return await sendEmail(
            user.email,
            'Payment Checkout Confirmation',
            textContent,
            htmlContent
        );
    } catch (err) {
        console.error(err);
    }
};

const sendAddTeamMemberEmail = async (userEmail: string, teamName: string) => {
    try {
        if (!userEmail) {
            throw new Error('Email address is missing for the team member');
        }

        if (!teamName) {
            throw new Error('Team name is missing');
        }

        const memberDetails = emailTemplates.AddTeamMember.memberDetails;

        const textContent = emailTemplates.AddTeamMember.text
            .replace('[teamName]', teamName)
            .replace('[memberDetails]', memberDetails);
        const htmlContent = emailTemplates.AddTeamMember.html
            .replace('[teamName]', teamName)
            .replace('[memberDetails]', memberDetails);

        return await sendEmail(
            userEmail,
            `Welcome to ${teamName}`,
            textContent,
            htmlContent
        );
    } catch (err) {
        console.error(err);
    }
};

const sendRegisterEmail = async (userEmail: string) => {
    try {
        if (!userEmail) {
            throw new Error('Email address is missing for registration');
        }

        const registrationDetails = emailTemplates.Register.registrationDetails;

        const textContent = emailTemplates.Register.text.replace(
            '[registrationDetails]',
            registrationDetails
        );
        const htmlContent = emailTemplates.Register.html.replace(
            '[registrationDetails]',
            registrationDetails
        );

        return await sendEmail(
            userEmail,
            'Registration Successful',
            textContent,
            htmlContent
        );
    } catch (err) {
        console.error(err);
    }
};

const sendLoginEmail = async (userEmail: string) => {
    try {
        if (!userEmail) {
            throw new Error('Email address is missing for login');
        }

        const loginTime = emailTemplates.Login.loginTime;

        const textContent = emailTemplates.Login.text.replace(
            '[loginTime]',
            loginTime
        );
        const htmlContent = emailTemplates.Login.html.replace(
            '[loginTime]',
            loginTime
        );

        return await sendEmail(
            userEmail,
            'Login Notification',
            textContent,
            htmlContent
        );
    } catch (err) {
        console.error(err);
    }
};

export {
    sendPasswordCodeEmail,
    sendEmailWithAcceptTMLink,
    sendChangeCreatorAuthByExtensionEmail,
    sendLoginExtensionEmail,
    sendPaymentCheckoutEmail,
    sendAddTeamMemberEmail,
    sendRegisterEmail,
    sendLoginEmail,
};
