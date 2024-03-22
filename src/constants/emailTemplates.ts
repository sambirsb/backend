export const emailTemplates = {
    ChangeCreatorAuthByExtension: {
        text: 'Your authentication details have been changed to: [newAuthDetails].',
        html: '<p>Your authentication details have been changed to: <strong>[newAuthDetails]</strong></p>',
        newAuthDetails: 'Details',
    },
    LoginExtension: {
        text: 'You have successfully logged in using the extension: [loginDetails].',
        html: '<p>You have successfully logged in using the extension: <strong>[loginDetails]</strong></p>',
        loginDetails: 'Login details',
    },
    PaymentCheckout: {
        text: 'Your payment has been processed: [paymentDetails].',
        html: '<p>Your payment has been processed: <strong>[paymentDetails]</strong></p>',
        paymentDetails: 'Payment details',
    },
    AddTeamMember: {
        text: 'You have been added to the team [teamName]: [memberDetails].',
        html: '<p>You have been added to the team <strong>[teamName]</strong>: [memberDetails]</p>',
        memberDetails: 'Member Details',
    },
    Register: {
        text: 'Thank you for registering: [registrationDetails].',
        html: '<p>Thank you for registering: <strong>[registrationDetails]</strong></p>',
        registrationDetails: 'Registration details',
    },
    Login: {
        text: 'You have successfully logged in at: [loginTime].',
        html: '<p>You have successfully logged in at: <strong>[loginTime]</strong></p>',
        loginTime: 'Login time',
    },

    PasswordCode: {
        text: 'Your code to change the password is: [code].',
        html: `<h2>Your Password Change Code</h2>
               <p>Your code to change the password is: <strong>[code]</strong></p>
               <p>If you did not request a password change, please ignore this email.</p>`,
    },
    AcceptTMLink: {
        text: 'Click on the link to confirm your agreement to join the team: [link].',
        html: `<h2>Confirm joining the Team</h2>
               <p><a href="[link]">Click here</a> to confirm joining the team.</p>
               <p>If you are not related to Top Creator, please, ignore this email.</p>`,
    },
};
