import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from 'bcrypt'
import { prismaDisconect, prismaError } from "../Libs/Prisma/PrimsaUtil"

const prisma = new PrismaClient()

class UserController{

  // CREATE A NEW USER WITH A EMAIL EXISTANCE VERIFICATION
  async createUser(req: Request, res: Response) {
    try {
      const data = req.body
      const create = async () => {
        const users: any = await prisma.usuarios.count({
          where: {
            email: data.email,
          }
        })
        if (users > 0) {
          res.json({status: true, msg: "Já existe uma conta com esse email!"});
          return
        }
        const userToCreate = await prisma.usuarios
          .create({
            data: {
              email: data.email,
              usuario: data.usuario,
              cnpj: data.cnpj,
              senha: await bcrypt.hash(req.body.senha, 15),
            },
          })
          .then(() => {
            res.status(201).json({status: true, msg: "Conta criada com sucesso!"});
          })
      }
      create()
        .then(() => {
          prismaDisconect()
        })
        .catch((e) => {
          prismaError(e)
        })
    } catch (err) {
      res.status(400).json(err)
    }
  }

  async userLogin(req: Request, res: Response) {
    try {
      const data = req.body
      const login = async () => {
        const userToLogin = await prisma.usuarios.findFirst({
          where: {
            OR: {
              email: { equals: data.email },
            },
          },
          select: {
              senha: true,
          }
        })

        if (userToLogin == undefined) {
          res.send(false)
          return
        } 
        
        await bcrypt.compare(data.senha, userToLogin.senha) ? res.json('true') : res.send('false');

      }
      login()
        .then(() => {
            prismaDisconect()
        })
        .catch((e) => {
          prismaError(e)
        })
    } 
    catch (err) {
      res.send(err)
    }
  }    
}

export default UserController