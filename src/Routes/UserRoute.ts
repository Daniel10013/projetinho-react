import express, {Request, Response} from 'express'

function routeUser(app: express.Application){
    app.get('/teste',async (req: Request, res: Response) => {
        res.send("Hello World");
    })
}

export default routeUser