import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Queja, PrismaClient, User } from "@prisma/client";

export class QuejaService {
  // Obtener queja por ID
  static async getById(id: number) {
    const findQueja = await prisma.queja.findUnique({ where: { id } });
    if (!findQueja) throw new HttpException(404, "Queja not found");
    return findQueja;
  }

  // Obtener todas las quejas con filtro opcional por título
  static async getAll(title: string = "") {
    return await prisma.queja.findMany({
      where: {
        ...(title && {
          title: {
            contains: title,
            // mode: "insensitive", // Descomentar si quieres búsqueda sin distinción de mayúsculas/minúsculas
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    });
  }

  // Crear una nueva queja
  static async create(idUser: number, queja: Queja) {
    console.log("creando queja para el usuario", idUser);
    return await prisma.queja.create({
      data: {
        ...queja,
        idUser: idUser,
      },
    });
  }

  // Actualizar una queja
  static async update(id: number, queja: Queja) {
    const findQueja = await prisma.queja.findUnique({ where: { id } });
    if (!findQueja) throw new HttpException(404, "Queja not found");
    return await prisma.queja.update({
      where: { id },
      data: {
        ...queja,
      },
    });
  }

  // Eliminar una queja
  static async delete(id: number) {
    try {
      return await prisma.queja.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(404, "Queja not found");
    }
  }
}
