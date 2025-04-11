
import { Router, Request, Response } from 'express';
import { IDomain } from '../types/db.types';

import dns from 'dns';
import { attachDbToRequest } from '../middlewares/attachDbToRequest.middleware.';

const domainsRoute = Router();

// Get domain history
domainsRoute.get('/get', attachDbToRequest, async (request: Request, response: Response) => {
    try{
        const collection = request.db?.collection('domainToIp');
        
        const domains = await collection?.find({}).toArray();
        
        response.json(domains);
    } catch(error: Error | unknown) {
        let message = error instanceof Error ? error.message : error;
        console.error('Error getting domain history:', message);
        response.status(500).json({ error: 'Internal server error. Failed to get domain history', message });
    } 
});


// Resolves the domain IP and 
// saves the result to domainToIP DB collection
domainsRoute.post('/resolve', attachDbToRequest, async (request: Request, response: Response) => {

    const { domain } = request.body; // Input from the user

    dns.lookup(domain, async (err, address) => {
        if (err) {
            return response.status(400).json({ error: 'Domain not found' });
        }

        try {

            const newDomain: IDomain = { domain, ip: address };
            await request.db?.collection('domainToIp').insertOne(newDomain);

            response.json(newDomain);

        } catch(error: Error | unknown) {
            let message = error instanceof Error ? error.message : error;

            console.error('Error saving to database:', message);
            response.status(500).json({ error: 'Failed to save the name to database.', message });
        }
    });
});

export default domainsRoute;