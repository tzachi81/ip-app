import { Request, Response, NextFunction } from 'express';
import { connectDB } from '../model/db/client';

import { Db } from 'mongodb';

declare global {
    namespace Express {
        interface Request {
            db?: Db;
        }
    }
}


export const attachDbToRequest = async (request: Request, response: Response, next: NextFunction) => {
    try {
        if (request.db) return;

        request.db = await connectDB();
        next();

    } catch (error) {
        response.status(500).json({ error: 'Database connection failed' });
    }
};