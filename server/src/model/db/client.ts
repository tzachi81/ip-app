import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const dbUri = process.env.MONGODB_URI!;
let client: MongoClient | null = null;
const dbName = 'domainToIp';

let db: Db | null = null;

export const connectDB = async () => {
    try {

        if (db) {
            // console.log('Using cached DB');
            return db;
        } else {
            client = await MongoClient.connect(dbUri);
            db = client.db(dbName);
            console.log('Connected to MongoDB');
            return db;
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export const getDatabase = () => {
    if (!db) {
        throw new Error('Could not initialize database connection.');
    }
    return db;
};

export const closeDB = async () => {
    if (!client) {
        throw new Error('Could not get database client.');
    }
    await client.close();
    console.log('MongoDB connection is now closed.');
};