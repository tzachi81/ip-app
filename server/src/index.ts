import express from 'express';
import * as dotenv from 'dotenv';

import cors from 'cors';

import  apiRouter from './routes/index';
import path from 'path';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173' || 'http://localhost:4173';
app.use(cors({
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST']
}));
app.use(express.json());


app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '../client/dist')));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

