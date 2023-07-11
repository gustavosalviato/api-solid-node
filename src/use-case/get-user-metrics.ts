import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";

interface GetUserMetricsRequest {
  userId: string

}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) { }

  async execute({ userId }: GetUserMetricsRequest) {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount
    }
  }
}