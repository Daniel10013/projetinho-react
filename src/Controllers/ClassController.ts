import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { prismaDisconect, prismaError } from "../Libs/Prisma/PrimsaUtil"
import { Class } from "../Interfaces/ClassInterface";

const prisma = new PrismaClient()

class ClassController{
    async createClass(req: Request, res: Response){
        try{
            const data: Class = req.body;
            const createClass: Function = async () =>{
                const classToCreate = await prisma.aulas.create({
                    data: {
                        nome_aula: data.title,
                        inicio_aulas: data.start,
                        fim_aulas: data.end,
                        professor_id: data.id_professor
                    }
                })

                res.json({status: true, msg: "Aula criada com sucesso!", data: classToCreate}).status(201)
            }   
            createClass()
                .then(async () => {
                    await prismaDisconect()
                })
                .catch(async (e: any) => {
                    await prismaError(e)
                })
        }
        catch(err){
            console.log(err)
        }
    }

    async getClasses(req: Request, res: Response){
        try{
            const id_professor: number = parseInt(req.params.id_professor)
            const getClassesFromTeacher: Function = async () => {
                const foundData = await prisma.aulas.findMany({
                    where: {
                        professor_id: id_professor
                    }
                })

                const dataToReturn: Array<Class> = foundData.map((eachData) => {
                    return<Class>{
                        title:   eachData.nome_aula,
                        start: eachData.inicio_aulas,
                        end: eachData.fim_aulas
                    }
                })

                res.json({status: true, msg: "Retornando todas as aula de um professor.", aulas: dataToReturn})
            }

            getClassesFromTeacher()
                .then(async () => {
                    await prismaDisconect()
                })
                .catch(async (e: any) => {
                    await prismaError(e)
                })
        }
        catch(err){
            console.log(err)
        }
    }
}

export default ClassController