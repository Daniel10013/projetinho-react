import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function prismaDisconect(){
    await prisma.$disconnect()
}
export async function prismaError(e: any){
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
}