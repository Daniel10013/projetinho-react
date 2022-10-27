import express, {Request, Response} from 'express'

export function route(app: express.Application){
    app.get('/teste',async (req: Request, res: Response) => {
        res.send("Hello World");
    })
}