export const config = {
    FRONTEND_URL: process.env.FRONTEND_URL,
    ONLYFANS_URL: process.env.ONLYFANS_URL,

    SEND_GRID: {
        apiKey: process.env.SG_API_KEY!,
        emailAddress: process.env.SG_EMAIL_ADDRESS!,
    },

    BRIGHT_DATA_PROXY: {
        host: process.env.BRIGHT_DATA_HOST!,
        port: process.env.BRIGHT_DATA_PORT!,
        userNameStart: process.env.BRIGHT_DATA_USER_NAME_START!,
        apiToken: process.env.BRIGHT_DATA_API_TOKEN!,
    },

    SENTRY_DSN: process.env.SENTRY_DSN,

    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY!,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
    AWS_REGION: process.env.AWS_REGION!,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME!,

    isProduction: process.env.NODE_ENV === 'production',

    PRODUCTION_PORTS: [
        process.env.FRONTEND_URL!,
        process.env.APPLICATION_URL!,
        process.env.ONLYFANS_URL!,
    ],
};
