import DisciplineController from '../Controllers/DisciplineController'
import express, { Request, Response } from 'express'

const teacherController = new DisciplineController()

function routeDiscipline(app: express.Application){
    app.post('/api/v1/discipline/create', async (req: Request, res: Response) => {
        try{
            await teacherController.createDiscipline(req, res)
        }
        catch (err){
            console.log(err)
        }
    })

    app.get('/api/v1/discipline/get-all',async (req: Request, res: Response) => {
        try{
            await teacherController.getAllDisciplines(req, res)
        }
        catch(err){
            console.log(err)
        }
    })
}

export default routeDiscipline