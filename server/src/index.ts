import express from 'express';

import { attachDbToRequest } from './middlewares/attachDbToRequest.middleware.';

import * as dotenv from 'dotenv';

import cors from 'cors';

import apiRouter from './routes/index';
import path from 'path';

import { closeDB } from './model/db/client';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const devOrigins = ['http://localhost:5173', 'http://localhost:4173'];
const allowedOrigins = (process.env.NODE_ENV === "production") ? [process.env.ALLOWED_ORIGIN] : devOrigins;

const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};



app.use(express.json());

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', apiRouter);


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//I added some DB connection guards
//with this terminate function
const terminate = async () => {
    await closeDB();
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
}


process.on('SIGINT', terminate); 
process.on('SIGINTERM', terminate); 

process.on('uncaughtException', async (err) => {
    console.error('Unhandled Exception:', err);
    await terminate();
});
