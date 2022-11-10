import { Request, Response } from 'express';
import { PrismaClient} from '@prisma/client';
import { prismaDisconect, prismaError } from "../Libs/Prisma/PrimsaUtil"

const prisma = new PrismaClient()

class DisciplineController{

    async createDiscipline(req: Request, res: Response){
        try{
            const data = req.body;
            const create = async () => {
                const toCreate = await prisma.disciplina.create({
                    data: {
                        nome: data.nome,
                        professor_id: data.professor_id
                    } 
                })
                .then(()=> {
                    res.status(201).json({status: true, msg: "Disciplina cadastrada com sucesso!"});
                })
            }
            create()
                .then(async ()=> {
                    await prismaDisconect();
                })
                .catch(async (e) => {
                    await prismaError(e)
                })
        }
        catch (err){
            console.log(err)
        }
    }
}

export default DisciplineController