import express from 'express'
import type { Express, Response, Request } from 'express';

const app: Express = express();
const port = process.env.PORT || 3000;
app.get('/', (req: Request, res: Response) => {
    res.send('Working');
})

app.listen(3000, () => {
    console.log(`Listening on port ${port}`)
});