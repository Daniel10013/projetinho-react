import TeacherController from '../Controllers/TeacherController'
import express, { Request, Response } from 'express'

const teacherController = new TeacherController()

function routeTeacher(app: express.Application){
    app.post('/api/v1/teacher/create', async (req: Request, res: Response) => {
        try{
            await teacherController.createTeacher(req, res)
        }
        catch (err){
            console.log(err)
        }
    })

    app.post('/api/v1/teacher/login', async (req: Request, res: Response) => {
        try{
            await teacherController.teacherLogin(req, res)
        }
        catch (err){
            console.log(err)
        }
    })

    app.get('/api/v1/teacher/get-all',async (req: Request, res: Response) => {
        try{
            await teacherController.getAllProfessores(req, res)
        }   
        catch(err){
            console.log(err)
        }
    })

}

export default routeTeacher