
import { LateCheckInValidationError } from "@/errors/late-check-in-validation-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository"
import { CheckIn } from "@prisma/client";
import dayjs from "dayjs";


interface ValidateCheckInUseCaseRequest {
  gymId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) { }

  async execute({ gymId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {

    const checkIn = await this.checkInsRepository.findById(gymId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }


    const distanceInMinutesFromCheckInCreation = dayjs(new Date).diff(
      checkIn.created_at,
      'minutes'
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn
    }

  }
}
