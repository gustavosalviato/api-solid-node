import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";

interface FethUseCheckInsHistoryRequest {
  userId: string
  page: number
}

export class FethUseCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) { }

  async execute({ userId, page }: FethUseCheckInsHistoryRequest) {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns
    }
  }
}