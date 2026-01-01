import dotenv from 'dotenv'
import express from 'express'
import type { Express, Response, Request } from 'express';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
app.get('/', (req: Request, res: Response) => {
    res.send('Working');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});