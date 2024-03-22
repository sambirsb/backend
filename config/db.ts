import mongoose from 'mongoose';

const connectMainDB = async () => {
    try {
        if (mongoose.connection.readyState === 1)
            return console.log('Using Existing Connection ✅');

        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Mongoose Connected 💚');
    } catch {
        throw new Error('Connect to Mongoose failed ❌');
    }
};

const connectToDB = async (uri: string, dbName: string) => {
    try {
        const dbConnection = mongoose.createConnection(uri);
        console.log(`${dbName} Connected 💚`);
        return dbConnection;
    } catch (error) {
        console.error(`Failed to connect to ${dbName} ❌`, error);
        throw error;
    }
};

const connectStatsDB = () => connectToDB(process.env.MONGO_URI_STATS as string, 'Stats DB');

export { connectMainDB, connectStatsDB };
