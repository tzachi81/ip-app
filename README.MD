# Domain-IP resolver
## Description
This React + express app shows the host machine's internal and public IP, resolves a given domain name to an IP address, and shows the history of the previous resolved names

## Production Host (Vercel)
>I Deployed and host this app on [Vercel](https://vercel.com) platform<br>
- Client side (UI), navigate to: https://domain-ip-client.vercel.app<br>
- Server side (an example of ip endpoint call), navigate to: https://doamin-ip-server.vercel.app/api/ip

## Data Base
>I set a MongoDB database collection for storing and retrieving the history requested
- collection reference path : 
`NextJS-Apps > cluster0: domainToIp.domainToIp`

## Development Environment Setup
1. Install Dependencies
- `cd server`
- (server): `yarn install`
- (client): `yarn install:client`
<br><br>
>You will run these next commands in the server folder's terminal
2. Build (client and server)
- `build:all`

2.1. (optional step) Debug The Server
1. `yarn debug`
2. Open dev-tools of the client application
3. Search and click the node icon (green hexagon)
4. A new dev-tools window will open up, you can debug the server code from there

3. Start (client and Server)
- `yarn start:all`
- in the terminal you will see something like that:<br>
`**[0] Server is running on http://localhost:3000
[1]   ➜  Local:   http://localhost:4173/
[1]   ➜  Network: use --host to expose
[0] Connected to MongoDB"**`
- To go to the client app navigate to the address of Local, the default URL will be: http://localhost:4173/

