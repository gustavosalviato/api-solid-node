import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "./check-ins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId

      }
    })

    return count
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    })

    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data
    })

    return checkIn
  }

  async findByUserIdOndate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })

    return checkIn
  }


  async findManyByUserId(id: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        id,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return checkIns
  }
}