import express, {Request, Response} from 'express';

const app = express();

app.get('/', (req: Request,res: Response) => {
    return res.send('Helo World')
})

app.get('/teste', (req: Request,res: Response) => {
    return res.send('teste1231')
})

app.listen(3333);