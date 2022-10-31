import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from 'bcrypt'
import { prismaDisconect, prismaError } from "../Libs/Prisma/PrimsaUtil"

const prisma = new PrismaClient()

class UserController{
    async userLogin(req: Request, res: Response) {
        try {
          const data = req.body
          let userToLogin: any
          const login = async () => {
            userToLogin = await prisma.usuarios.findFirst({
              where: {
                OR: {
                  email: { equals: data.email },
                },
              },
              select: {
                senha: true,
              },
            })
    
            if (userToLogin == undefined) {
              res.send(false)
            } else {
              // res.json(userToLogin)
              (await bcrypt.compare(data.senha, userToLogin.senha))
                ? res.send('true')
                : res.send('false')
            }
          }
          login()
            .then(() => {
              prismaDisconect()
            })
            .catch((e) => {
              prismaError(e)
            })
        } catch (err) {
          res.status(500).json(err)
        }
      }    
}

export default UserController