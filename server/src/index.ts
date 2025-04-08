import express, {Request, Response} from 'express';
import * as dotenv from 'dotenv';

import cors from 'cors';

import  apiRouter from './routes/index';
import path from 'path';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '../client/dist')));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

