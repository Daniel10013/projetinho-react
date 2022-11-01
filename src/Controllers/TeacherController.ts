import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { prismaDisconect, prismaError } from "../Libs/Prisma/PrimsaUtil"

const prisma = new PrismaClient()

class teacherController{

    async createTeacher(req: Request, res: Response){
        try{
            const data = req.body;
            const create = async () => {
                const professores = await prisma.professor.count({
                    where: {
                      email: data.email,
                    },
                  })
                if (professores > 0) {
                    res.json({status: false, msg: "Já existe uma conta com esse email!"});
                    return
                }
                const toCreate = await prisma.professor.create({
                    data: {
                        nome: data.nome,
                        email: data.email,
                        senha: await bcrypt.hash(req.body.senha, 15),
                        idade: data.idade
                    } 
                })
                .then(()=> {
                    res.status(201).json({status: true, msg: "Conta criada com sucesso!"});
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

export default teacherController