import { IDomain } from "../types/domain.types";

const isProduction = import.meta.env.VITE_ENV === 'production';

const apiUrl = isProduction ? import.meta.env.VITE_API_URL : 'http://localhost:3000/api';
//TODO: 
// 1. Wrap as a service class, or
// 2. Split these in two files: ipApi.ts and domainApi.ts

//'/api/ip'
export const fetchHostAddresses = async () => {
    const response = await fetch(`${apiUrl}/ip`);
    if (!response.ok) {
        throw new Error('Failed to fetch IP addresses.');
    }
    return response.json();
};


//'api/domains/'
export const resolveDomain = async (domain: string) => {
    const response = await fetch(`${apiUrl}/domains/resolve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain }),
    });
    if (!response.ok) {
        throw new Error(`Failed to resolve domain '${domain}'.`);
    }
    return response.json();
};

export const fetchDomainHistory = async () => {
    const response = await fetch(`${apiUrl}/domains/get`);
    if (!response.ok) {
        throw new Error('Failed to fetch domain history.');
    }
    return response.json();
};

export const getCleanDomainName = (domain: string) => {
    const splitProtocol = domain.indexOf("://") > -1 ? domain.split("://")[1] : domain;
    const cleanDomain = splitProtocol.indexOf("?") > -1 ? splitProtocol.split("?")[0].split("/")[0] : splitProtocol.split("/")[0];
    return cleanDomain.trim();
};

export const isValidDomainPattern = (domainName: string) => {
    const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return domainPattern.test(domainName);
};

export const isDomainExists = (domainName: string, domainHistory: IDomain[]) => {
    return domainHistory.some(
        (domainObj: IDomain) => domainObj.domain === domainName
    );
};