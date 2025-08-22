import os from 'os';
import { Request, Response } from 'express';
import { Router } from 'express';

export const ipRoute = Router();

// Handles internal and public IP addresses
ipRoute.get('/', (request: Request, response: Response) => {
    try {

        const osInterfaces = os.networkInterfaces();
        //Checks protocol type (got this reference from 'iifx blog - https://iifx.dev/en/articles/15736711")
        const internalIP = Object.values(osInterfaces)
            .flat()
            .find(osInterface => osInterface?.family === 'IPv4' && !osInterface.internal);

        const publicIP = request.headers['x-forwarded-for'] || request.socket.remoteAddress;

        response.status(200).json({
            internalIP: internalIP ? internalIP.address : 'Not found',
            publicIP: publicIP,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error getting IP addresses:', error.message);
        } else {
            console.error('Error getting IP addresses:', error);
        }
        response.status(500).json({ error: 'Internal server error' });
    }
});