#

# Install Dependencies
- `cd server`
- (server): `yarn install`
- (client): `yarn install:client`

# Build (client and server)
- `build:all`

# Debug Server
1. `yarn debug`
2. Open dev-tools of the client application
3. Search and click the node icon (green hexagon)
4. A new dev-tools window will open up, you can debug the server code from there

# Start (client and Server)
- `yarn start:all`
- in the terminal you will see something like that:<br>
`**[0] Server is running on http://localhost:3000
[1]   ➜  Local:   http://localhost:4173/
[1]   ➜  Network: use --host to expose
[0] Connected to MongoDB"**`
- To go to the client app navigate to the address of Local, the default URL will be: http://localhost:4173/

