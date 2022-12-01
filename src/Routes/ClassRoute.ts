import express, { Request, Response } from "express";
import ClassController from "../Controllers/ClassController";

const classObj: ClassController = new ClassController()

function routeClass(app: express.Application){
    app.post('/api/v1/class/create',async (req: Request, res: Response) => {
        try{
            await classObj.createClass(req, res)
        }
        catch(err){
            console.log(err)
        }
    })

    app.get('/api/v1/class/get-all-from-teacher/:id_professor',async (req: Request, res: Response) => {
        try{
            await classObj.getClasses(req, res)
        }
        catch(err){
            console.log(err)
        }
    })
}

export default routeClass