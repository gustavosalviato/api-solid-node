
import { MaxDistantError } from "@/errors/max-distant-error";
import { MaxNumberOfCheckInError } from "@/errors/max-number-of-check-ins.error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository"
import { GymsRepository } from "@/repositories/prisma/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { CheckIn } from "@prisma/client";


interface CheckInUseCaseRequest {
  userId: string,
  gymId: string
  userLatitude: number
  userLogitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository, private gymsRepository: GymsRepository) { }

  async execute({ gymId, userId, userLatitude, userLogitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOndate(userId, new Date())

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInError()
    }

    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates({
      latitude: userLatitude, longitude: userLogitude
    }, {
      latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()
    })

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistantError()
    }
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return {
      checkIn
    }
  }
}
