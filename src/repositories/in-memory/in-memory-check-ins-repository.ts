import { CheckIn, Prisma, } from "@prisma/client";
import { CheckInsRepository } from "../prisma/check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";


export class InMemoryCheckInsRespository implements CheckInsRepository {

  public checkIns: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null
    };

    this.checkIns.push(checkIn)

    return checkIn;
  }

  async findByUserIdOndate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = await this.checkIns.find(checkIn => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(id: string, page: number): Promise<CheckIn[]> {
    const checkIns = await this.checkIns.filter(checkIn => checkIn.user_id === id).splice((page -1) * 20, page * 20)

    return checkIns
  }

}
