import dotenv from 'dotenv';
dotenv.config();
import * as Sentry from '@sentry/node';

import express from 'express';
import { Connection } from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { Server as SocketIOServer } from 'socket.io';
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

const app = express();
const PORT = process.env.PORT || 4000;
let statsDBConnection: Connection;

import path from 'path';

const jsFilePath = path.join(__dirname, '../../public/injection.js');

app.get('/injection.js', (_, res) => {
    res.sendFile(jsFilePath);
});

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

    // io.on('connection', (socket) => {
    //     console.log(`A client connected`);

    //     socket.on('initializeTracking', async (data) => {
    //         if (data && data.token) {
    //             await setupTrackCreatorsConnection(data.token, io);
    //             await changeCreatorsStatus(data.openedCreatorIds);
    //         }
    //     });

    //     socket.on('disconnect', () => {
    //         console.log('User disconnected');
    //     });
    // });

    app.use('/image', imageRoutes);

    if (process.env.WEBSOCKETS_ENABLED === 'true') {
        webSocketConnection();
        cronMassMessage();
        await cronPromotionReactivator(); // додав await, через проблеми з аккаунтами, не тестував
        await cronAutoFollow(); // додав await, через проблеми з аккаунтами, не тестував
        await cleanupOldTasks();
        await cronUpdateStats(statsDBConnection);
    }

    app.use(Sentry.Handlers.errorHandler());

    httpServer.listen(PORT);
}

startServer().then(() => {
    console.log(
        `For using Apollo Server click here: http://localhost:${PORT}/graphql`
    );
});

const OPENED_CREATORS: { [creatorId: string]: string } = {};

const io = new SocketIOServer(httpServer, {
    cors: {
        origin: config.isProduction ? config.PRODUCTION_PORTS : '*',
    },
});

io.on('connection', (socket) => {
    console.log('A user connected');

    const sendList = () => {
        io.emit('list', Object.keys(OPENED_CREATORS));
    };

    socket.on('browser_started', ({ id }) => {
        OPENED_CREATORS[id] = socket.id;
        sendList();
        console.log('browser_started', OPENED_CREATORS);
    });

    socket.on('browser_closed', ({ id }) => {
        delete OPENED_CREATORS[id];
        sendList();
        console.log('browser_closed', OPENED_CREATORS);
    });

    socket.on('get_list', () => {
        sendList();
        console.log('get_list', Object.keys(OPENED_CREATORS));
    });

    socket.on('disconnect', () => {
        sendList();
        console.log('A user disconnected');
    });
});
