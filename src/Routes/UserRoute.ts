import UserController from '../Controllers/UserController'
import express, {Request, Response} from 'express'

const userController = new UserController()

function routeUser(app: express.Application){
    app.post('/api/v1/users/login',async (req: Request, res: Response) => {
        try {
            await userController.userLogin(req, res)
        } 
        catch (err) {
            console.log(err)
        }
    })

    app.post('/api/v1/users/create',async (req: Request, res: Response) => {
        try {
            await userController.createUser(req, res)
        } 
        catch (err) {
            console.log(err)
        }
    })
}

export default routeUser