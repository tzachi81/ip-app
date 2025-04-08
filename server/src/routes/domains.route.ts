
import { Router, Request, Response } from 'express';
import { connectDB, getDatabase } from '../model/db/client';
import { IDomain } from '../types/db.types';

import dns from 'dns';


// Connect to MongoDB
//TODO: add close connection function
connectDB();

export const domainsRoute = Router();

// Get domain history
domainsRoute.get('/get', async (request: Request, response: Response) => {
    const db = getDatabase();
    const collection = db && db.collection<IDomain>('domainToIp');

    const domains = await collection?.find().toArray();
    response.json(domains);
});


// Resolves the domain IP and 
// saves the result to domainToIP DB collection
domainsRoute.post('/resolve', async (request: Request, response: Response) => {

    const { domain } = request.body; // Input from the user

    dns.lookup(domain, async (err, address) => {
        if (err) {
            return response.status(400).json({ error: 'Domain not found' });
        }

        const db = getDatabase();

        try {

            const collection = db && db.collection<IDomain>('domainToIp');

            const newDomain: IDomain = { domain, ip: address };
            await collection?.insertOne(newDomain);

            response.json(newDomain);
        } catch (error) {
            console.error('Error saving to database:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
        // TODO: Close the database connection after that
    });
});

