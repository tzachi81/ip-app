import os from 'os';
import { Request, Response } from 'express';
import { Router } from 'express';


// Handles internal and public IP addresses
const getIp = (request: Request, response: Response) => {
    const osInterfaces = os.networkInterfaces();
    //Checks protocol type (got this reference from 'iifx blog - https://iifx.dev/en/articles/15736711")
    const internalIP = Object.values(osInterfaces)
    .flat()
    .find(osInterface => osInterface?.family === 'IPv4' && !osInterface.internal);
    
    //TODO: check efficiency.. right way to get the public IP address.
    const publicIP = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    
    response.json({
        internalIP: internalIP ? internalIP.address : 'Not found',
        publicIP: publicIP,
    });
}

export const ipRoute = Router();
ipRoute.get('/', getIp);