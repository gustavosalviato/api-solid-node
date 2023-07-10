import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "./check-ins-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCheckInsRepository implements CheckInsRepository {

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data
    })

    return checkIn
  }

  findByUserIdOndate(userId: string, date: Date): Promise<CheckIn | null> {
    throw new Error("Method not implemented.");
  }

  findManyByUserId(id: string): Promise<CheckIn[]> {
    throw new Error("Method not implemented.");
  }
}