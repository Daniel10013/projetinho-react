import { Request, Response } from 'express';
import { PrismaClient} from '@prisma/client';
import { prismaDisconect, prismaError } from "../Libs/Prisma/PrimsaUtil"

const prisma = new PrismaClient()

class ClassRoomController{

    async createClassRoom(req: Request, res: Response){
        try{
            const data = req.body;
            const create = async () => {
                await prisma.turma.create({
                    data: {
                        nome: data.nome,
                        limite_alunos: data.limite_alunos,
                        professor_id: data.professor_id
                    }
                })

                res.json({status: true, msg: "Turma criada com sucesso!"})
            }   
            create()
                .then(async ()=> {
                    await prismaDisconect();
                })
                .catch(async (e)=>{
                    await prismaError(e);
                })
        }
        catch(err){
            console.log(err)
        }
    }
}

export default ClassRoomController