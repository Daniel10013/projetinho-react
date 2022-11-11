import ClassRoomController from '../Controllers/ClassRoomController';
import express, {Request , Response} from 'express';

const classRoomObj = new ClassRoomController()

function routeClassRoom(app: express.Application){

    app.post('/api/v1/classroom/create', async (req: Request, res: Response) => {
        try{
            await classRoomObj.createClassRoom(req, res)
        }
        catch(err){
            console.log(err)
        }
    })
}

export default routeClassRoom;