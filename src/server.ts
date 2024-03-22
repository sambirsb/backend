import dotenv from 'dotenv';
dotenv.config();
import * as Sentry from '@sentry/node';

import express from 'express';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectMainDB, connectStatsDB } from '../config/db';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { expressMiddleware } from '@apollo/server/express4';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { config } from './constants/config/env';
import authService from './services/AuthService';
import imageRoutes from './routes/imageRoutes';
import { resolversArray } from './resolvers/_indexResolvers';
import {
    loadGraphQLFiles,
    stripeWebhook,
    cronAutoFollow,
    cronMassMessage,
    cronPromotionReactivator,
    cleanupOldTasks,
    webSocketConnection,
    cronUpdateStats,
} from './utils';
import { Connection } from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4000;
let statsDBConnection: Connection;

Sentry.init({
    dsn: config.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Express({
            app,
        }),
        new Sentry.Integrations.GraphQL(),
        new Sentry.Integrations.Apollo(),
    ],

    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.post(
    '/api/webhook',
    express.raw({ type: 'application/json' }),
    stripeWebhook
);

app.use(bodyParser.json());

const httpServer = createServer(app);

const typeDefs = loadGraphQLFiles();

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: { ...resolversArray.Query },
        Mutation: { ...resolversArray.Mutation },
    },
});

const server = new ApolloServer({
    schema,
    formatError: (error) => {
        Sentry.captureException(error);
        return error;
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const corsOptions = {
    origin: config.isProduction ? config.PRODUCTION_PORTS : '*',
};

app.use(cors(corsOptions));

async function startServer() {
    await server.start();

    await connectMainDB();

    statsDBConnection = await connectStatsDB();

    app.use(
        '/graphql',
        expressMiddleware(server, {
            context: async ({ req }) => {
                const token = req.headers.authorization
                    ? req.headers.authorization.split(' ')[1]
                    : '';
                let currentUser = null;

                if (token) {
                    currentUser = authService.getDataFromTokenContext(token);
                }

                return {
                    token,
                    currentUser,
                    statConnection: statsDBConnection,
                };
            },
        })
    );

    app.use('/image', imageRoutes);

    if (process.env.WEBSOCKETS_ENABLED === 'true') {
        webSocketConnection();
        cronMassMessage();
        await cronPromotionReactivator(); // додав await, через проблеми з аккаунтами, не тестував
        await cronAutoFollow(); // додав await, через проблеми з аккаунтами, не тестував
        await cleanupOldTasks();
    }

    await cronUpdateStats(statsDBConnection); 

    app.use(Sentry.Handlers.errorHandler());

    httpServer.listen(PORT);
}

startServer().then(() => {
    console.log(
        `For using Apollo Server click here: http://localhost:${PORT}/graphql`
    );
});
