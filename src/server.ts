import express, {Request, Response} from 'express';

const app = express();

app.get('/', (req: Request,res: Response) => {
    return res.send('Helo World')
})

app.listen(3333);