import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Offer, PrismaClient, User } from "@prisma/client";
//const prisma = new PrismaClient()

export class OfferService {

    static async getById(id: number){
        const findOffer = await prisma.offer.findUnique({ where: {id}})
        if(!findOffer) throw new HttpException(404, 'Offer not found')
         return findOffer
     }

     // localhost:3000/api/offer/?title=dam
     static async getAll(title: string = ''){
       /*  return await prisma.offer.findMany({
            where: title ? {
                title: {
                    contains: title
                }
            } : {},
            orderBy: {
                createdAt: 'desc'
            },
            take: 100
        }) */

            return await prisma.offer.findMany({
                where: {
                    ...(title && {
                        title: {
                            contains: title,
                            //mode: "insensitive" // Búsqueda sin distinción entre mayúsculas y minúsculas
                        }
                    })
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 100,
                include: {
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            });
     }

     static async create(idUser: number, offer: Offer){
        return await prisma.offer.create({
            data: {
                ...offer,
                idUserCreator: idUser
            } 
        })
     }

     static async update(id: number, offer: Offer){
        const findOffer = await prisma.offer.findUnique({where:{id}})
        if(!findOffer) throw new HttpException(404, 'Offer doesnt exists')
        return await prisma.offer.update({
            where: {id},
            data: {
                ...offer,
            } 
        })
     }

     static async delete(id: number) {
        try {
            return await prisma.offer.delete({ where: { id } });
        } catch (error) {
            throw new HttpException(404, "Offer not found");
        }
    }
    

     
     static async rate(idUser: number, id: number, value: number){
        //si existe lo actualizo
       // si no existe lo creo
     }

     static async getRate(id: number){
       
     }

}