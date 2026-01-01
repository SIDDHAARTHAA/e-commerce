import dotenv from 'dotenv'
import express from 'express'
import type { Express, Response, Request } from 'express';
import rootRouter from './routes/index.js';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/api', rootRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});